import axios from "axios";

const SUPABASE_BASE_URL = "https://pehwwztrbeupnnvnjsnq.supabase.co/rest/v1";
const USERS_URL = `${SUPABASE_BASE_URL}/bengkel_users`;
const BOOKINGS_URL = `${SUPABASE_BASE_URL}/pesanan`;
const COMPLAINTS_URL = `${SUPABASE_BASE_URL}/komplain`;
const PROMOS_URL = `${SUPABASE_BASE_URL}/produk`;
const API_KEY = "sb_publishable_59d0MhZa_UBrmJJz5s0OMQ_aUpCiETU";
const UNAVAILABLE_TABLES_STORAGE_KEY = "bengkelgo_unavailable_supabase_tables";
const LOCAL_BOOKINGS_STORAGE_KEY = "bengkelgo_local_bookings";
const LOCAL_COMPLAINTS_STORAGE_KEY = "bengkelgo_local_complaints";
const LOCAL_PROMOS_STORAGE_KEY = "bengkelgo_local_promos";
const LOCAL_MEMBERS_STORAGE_KEY = "bengkelgo_local_members";
const LOCAL_MEMBER_OVERRIDES_STORAGE_KEY = "bengkelgo_local_member_overrides";
const TABLE_RECHECK_DELAY_MS = 5 * 60 * 1000;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const isMissingTableError = (error) => error?.response?.status === 404;
const isBadRequestError = (error) => error?.response?.status === 400;

const readStorageJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorageJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local fallback is best-effort only.
  }
};

const getUnavailableTables = () => {
  const value = readStorageJson(UNAVAILABLE_TABLES_STORAGE_KEY, {});
  if (Array.isArray(value)) {
    return Object.fromEntries(value.map((tableName) => [tableName, Date.now()]));
  }
  return value || {};
};

const isTableUnavailable = (tableName) => {
  const unavailableTables = getUnavailableTables();
  const lastFailedAt = unavailableTables[tableName];
  return lastFailedAt && Date.now() - lastFailedAt < TABLE_RECHECK_DELAY_MS;
};

const markTableUnavailable = (tableName) => {
  const unavailableTables = getUnavailableTables();
  writeStorageJson(UNAVAILABLE_TABLES_STORAGE_KEY, {
    ...unavailableTables,
    [tableName]: Date.now(),
  });
};

const getLocalRows = (storageKey) => readStorageJson(storageKey, []);

const saveLocalRow = (storageKey, rowData) => {
  const rows = getLocalRows(storageKey);
  const row = {
    ...rowData,
    id: rowData.id || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `local-${Date.now()}`),
    created_at: rowData.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_local_fallback: true,
  };
  writeStorageJson(storageKey, [row, ...rows]);
  return row;
};

const updateLocalRow = (storageKey, id, payload) => {
  const rows = getLocalRows(storageKey);
  const updatedRows = rows.map((row) =>
    row.id === id ? { ...row, ...payload, updated_at: new Date().toISOString() } : row
  );
  writeStorageJson(storageKey, updatedRows);
  return updatedRows.find((row) => row.id === id) || null;
};

const getLocalMemberOverrides = () => readStorageJson(LOCAL_MEMBER_OVERRIDES_STORAGE_KEY, {});

const getLocalMembers = () => getLocalRows(LOCAL_MEMBERS_STORAGE_KEY).map(mergeLocalMemberOverride);

const getLocalMemberById = (id) =>
  getLocalMembers().find((member) => String(member.id) === String(id)) || null;

const getLocalMemberByEmail = (email) =>
  getLocalMembers().find((member) => String(member.email || "").toLowerCase() === String(email || "").toLowerCase()) || null;

const getLocalMemberOverride = (id) => getLocalMemberOverrides()[String(id)] || null;

const mergeLocalMemberOverride = (member) => {
  if (!member?.id) return member;
  const override = getLocalMemberOverride(member.id);
  if (!override) return member;
  // Supabase data takes priority; only fill in missing fields from local override
  const merged = { ...override, ...member };
  return merged;
};

const saveLocalMemberOverride = (id, payload) => {
  const overrides = getLocalMemberOverrides();
  const currentOverride = overrides[String(id)] || {};
  const nextOverride = {
    ...currentOverride,
    ...payload,
    id,
    updated_at: new Date().toISOString(),
    is_local_fallback: true,
  };
  writeStorageJson(LOCAL_MEMBER_OVERRIDES_STORAGE_KEY, {
    ...overrides,
    [String(id)]: nextOverride,
  });
  return nextOverride;
};

const logSupabaseError = (message, error) => {
  if (isMissingTableError(error)) {
    console.warn(`${message}. Tabel Supabase belum tersedia atau belum terekspos REST.`);
    return;
  }

  console.error(message, error);
};

export const customerAPI = {
  async getAllMembers() {
    try {
      const response = await axios.get(`${USERS_URL}?role=eq.Member&order=created_at.desc`, { headers });
      const remoteMembers = (response.data || []).map(mergeLocalMemberOverride);
      const remoteEmails = new Set(remoteMembers.map((member) => String(member.email || "").toLowerCase()));
      const localOnlyMembers = getLocalMembers().filter(
        (member) => !remoteEmails.has(String(member.email || "").toLowerCase())
      );
      return [...localOnlyMembers, ...remoteMembers];
    } catch (error) {
      logSupabaseError("Gagal mengambil data dari Supabase bengkel_users", error);
      return getLocalMembers();
    }
  },

  async getMemberById(id) {
    // Always try Supabase first for fresh data
    try {
      const response = await axios.get(`${USERS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      const member = (response.data && response.data[0]) || null;
      if (member) {
        return mergeLocalMemberOverride(member);
      }
    } catch (error) {
      logSupabaseError(`Gagal mengambil data member ID ${id} dari Supabase`, error);
    }

    // Fallback to localStorage
    const localMember = getLocalMemberById(id);
    if (localMember) {
      return localMember;
    }

    return getLocalMemberOverride(id);
  },

  async getMemberByEmail(email) {
    // Always try Supabase first to get fresh data (role, tier, etc.)
    try {
      const response = await axios.get(`${USERS_URL}?email=eq.${encodeURIComponent(email)}`, { headers });
      const member = (response.data && response.data[0]) || null;
      if (member) {
        return mergeLocalMemberOverride(member);
      }
    } catch (error) {
      logSupabaseError(`Gagal mengambil data member email ${email} dari Supabase`, error);
    }

    // Fallback to localStorage only if Supabase fails or has no data
    const localMember = getLocalMemberByEmail(email);
    if (localMember) {
      return localMember;
    }

    return null;
  },

  async createMember(memberData) {
    try {
      const response = await axios.post(USERS_URL, memberData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal membuat customer baru", error);
      if (isBadRequestError(error) || isMissingTableError(error)) {
        return saveLocalRow(LOCAL_MEMBERS_STORAGE_KEY, memberData);
      }
      throw error;
    }
  },

  async updateMember(id, payload) {
    const isMembershipPayload = "tier" in payload || "points" in payload;

    if (isMembershipPayload) {
      return saveLocalMemberOverride(id, payload);
    }

    try {
      const response = await axios.patch(`${USERS_URL}?id=eq.${encodeURIComponent(id)}`, payload, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return mergeLocalMemberOverride((response.data && response.data[0]) || { id, ...payload });
    } catch (error) {
      if (isBadRequestError(error)) {
        return saveLocalMemberOverride(id, payload);
      }
      logSupabaseError(`Gagal mengupdate data member ID ${id}`, error);
      throw error;
    }
  },

  async getAllBookings() {
    if (isTableUnavailable("pesanan")) {
      return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY);
    }

    try {
      const response = await axios.get(`${BOOKINGS_URL}?order=tanggal_booking.desc`, { headers });
      return response.data || [];
    } catch (error) {
      logSupabaseError("Gagal mengambil data booking dari Supabase", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY);
      }
      return [];
    }
  },

  async getBookingById(id) {
    if (isTableUnavailable("pesanan")) {
      return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).find((booking) => booking.id === id) || null;
    }

    try {
      const response = await axios.get(`${BOOKINGS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError(`Gagal mengambil booking ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).find((booking) => booking.id === id) || null;
      }
      return null;
    }
  },

  async getMemberBookings(memberId) {
    if (isTableUnavailable("pesanan")) {
      return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).filter((booking) => booking.user_id === memberId);
    }

    try {
      const response = await axios.get(`${BOOKINGS_URL}?user_id=eq.${encodeURIComponent(memberId)}&order=tanggal_booking.desc`, { headers });
      return response.data || [];
    } catch (error) {
      logSupabaseError(`Gagal mengambil riwayat booking member ${memberId}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        return getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).filter((booking) => booking.user_id === memberId);
      }
      return [];
    }
  },

  async createBooking(bookingData) {
    if (isTableUnavailable("pesanan")) {
      return saveLocalRow(LOCAL_BOOKINGS_STORAGE_KEY, bookingData);
    }

    try {
      const response = await axios.post(BOOKINGS_URL, bookingData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal membuat booking baru", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        return saveLocalRow(LOCAL_BOOKINGS_STORAGE_KEY, bookingData);
      }
      throw error;
    }
  },

  // Force write booking to Supabase without falling back to localStorage
  async createBookingRemote(bookingData) {
    try {
      const response = await axios.post(BOOKINGS_URL, bookingData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal menulis booking ke Supabase (remote)", error);
      throw error;
    }
  },

  async updateBooking(id, payload) {
    if (isTableUnavailable("pesanan")) {
      return updateLocalRow(LOCAL_BOOKINGS_STORAGE_KEY, id, payload);
    }

    try {
      const response = await axios.patch(`${BOOKINGS_URL}?id=eq.${encodeURIComponent(id)}`, payload, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError(`Gagal mengupdate booking ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        return updateLocalRow(LOCAL_BOOKINGS_STORAGE_KEY, id, payload);
      }
      throw error;
    }
  },

  async getAllComplaints() {
    if (isTableUnavailable("komplain")) {
      return getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY);
    }

    try {
      const response = await axios.get(`${COMPLAINTS_URL}?order=id.desc`, { headers });
      return response.data || [];
    } catch (error) {
      logSupabaseError("Gagal mengambil data komplain dari Supabase", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("komplain")
        return getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY);
      }
      return [];
    }
  },

  async getMemberComplaints(memberId) {
    if (isTableUnavailable("komplain")) {
      return getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY).filter((complaint) => complaint.user_id === memberId);
    }

    try {
      const response = await axios.get(`${COMPLAINTS_URL}?user_id=eq.${encodeURIComponent(memberId)}`, { headers });
      return response.data || [];
    } catch (error) {
      logSupabaseError(`Gagal mengambil riwayat komplain member ${memberId}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("komplain")
        return getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY).filter((complaint) => complaint.user_id === memberId);
      }
      return [];
    }
  },

  async createComplaint(complaintData) {
    if (isTableUnavailable("komplain")) {
      return saveLocalRow(LOCAL_COMPLAINTS_STORAGE_KEY, complaintData);
    }

    try {
      const response = await axios.post(COMPLAINTS_URL, complaintData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal membuat komplain baru", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("komplain")
        return saveLocalRow(LOCAL_COMPLAINTS_STORAGE_KEY, complaintData);
      }
      throw error;
    }
  },

  async updateComplaint(id, payload) {
    if (isTableUnavailable("komplain")) {
      return updateLocalRow(LOCAL_COMPLAINTS_STORAGE_KEY, id, payload);
    }

    try {
      const response = await axios.patch(`${COMPLAINTS_URL}?id=eq.${encodeURIComponent(id)}`, payload, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError(`Gagal mengupdate komplain ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("komplain")
        return updateLocalRow(LOCAL_COMPLAINTS_STORAGE_KEY, id, payload);
      }
      throw error;
    }
  },

  async getAllPromos() {
    if (isTableUnavailable("produk")) {
      return getLocalRows(LOCAL_PROMOS_STORAGE_KEY);
    }

    try {
      const response = await axios.get(`${PROMOS_URL}?order=id.desc`, { headers });
      return response.data || [];
    } catch (error) {
      logSupabaseError("Gagal mengambil data promo dari Supabase", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("produk")
        return getLocalRows(LOCAL_PROMOS_STORAGE_KEY);
      }
      return [];
    }
  },

  async createPromo(promoData) {
    if (isTableUnavailable("produk")) {
      return saveLocalRow(LOCAL_PROMOS_STORAGE_KEY, promoData);
    }

    try {
      const response = await axios.post(PROMOS_URL, promoData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal membuat promo baru", error);
      if (isMissingTableError(error)) {
        markTableUnavailable("produk")
        return saveLocalRow(LOCAL_PROMOS_STORAGE_KEY, promoData);
      }
      throw error;
    }
  },

  // Force write directly to Supabase; do NOT fallback to localStorage.
  // Throws on any error so callers can decide how to handle availability.
  async createPromoRemote(promoData) {
    try {
      const response = await axios.post(PROMOS_URL, promoData, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError("Gagal menulis promo ke Supabase (remote)", error);
      // Surface the error to caller — do not fallback locally.
      throw error;
    }
  },

  async deleteBooking(id) {
    if (isTableUnavailable("pesanan")) {
      const rows = getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).filter((row) => row.id !== id);
      writeStorageJson(LOCAL_BOOKINGS_STORAGE_KEY, rows);
      return true;
    }

    try {
      await axios.delete(`${BOOKINGS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      return true;
    } catch (error) {
      logSupabaseError(`Gagal menghapus booking ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("pesanan")
        const rows = getLocalRows(LOCAL_BOOKINGS_STORAGE_KEY).filter((row) => row.id !== id);
        writeStorageJson(LOCAL_BOOKINGS_STORAGE_KEY, rows);
        return true;
      }
      throw error;
    }
  },

  async deleteComplaint(id) {
    if (isTableUnavailable("komplain")) {
      const rows = getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY).filter((row) => row.id !== id);
      writeStorageJson(LOCAL_COMPLAINTS_STORAGE_KEY, rows);
      return true;
    }

    try {
      await axios.delete(`${COMPLAINTS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      return true;
    } catch (error) {
      logSupabaseError(`Gagal menghapus komplain ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("komplain")
        const rows = getLocalRows(LOCAL_COMPLAINTS_STORAGE_KEY).filter((row) => row.id !== id);
        writeStorageJson(LOCAL_COMPLAINTS_STORAGE_KEY, rows);
        return true;
      }
      throw error;
    }
  },

  async deletePromo(id) {
    if (isTableUnavailable("produk")) {
      const rows = getLocalRows(LOCAL_PROMOS_STORAGE_KEY).filter((row) => row.id !== id);
      writeStorageJson(LOCAL_PROMOS_STORAGE_KEY, rows);
      return true;
    }

    try {
      await axios.delete(`${PROMOS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      return true;
    } catch (error) {
      logSupabaseError(`Gagal menghapus promo ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("produk")
        const rows = getLocalRows(LOCAL_PROMOS_STORAGE_KEY).filter((row) => row.id !== id);
        writeStorageJson(LOCAL_PROMOS_STORAGE_KEY, rows);
        return true;
      }
      throw error;
    }
  },

  async deleteMember(id) {
    try {
      await axios.delete(`${USERS_URL}?id=eq.${encodeURIComponent(id)}`, { headers });
      // Also remove local overrides
      const overrides = getLocalMemberOverrides();
      delete overrides[String(id)];
      writeStorageJson(LOCAL_MEMBER_OVERRIDES_STORAGE_KEY, overrides);
      // Remove from local members if exists
      const localMembers = getLocalRows(LOCAL_MEMBERS_STORAGE_KEY).filter((row) => row.id !== id);
      writeStorageJson(LOCAL_MEMBERS_STORAGE_KEY, localMembers);
      return true;
    } catch (error) {
      logSupabaseError(`Gagal menghapus member ID ${id}`, error);
      if (isBadRequestError(error) || isMissingTableError(error)) {
        const overrides = getLocalMemberOverrides();
        delete overrides[String(id)];
        writeStorageJson(LOCAL_MEMBER_OVERRIDES_STORAGE_KEY, overrides);
        const localMembers = getLocalRows(LOCAL_MEMBERS_STORAGE_KEY).filter((row) => row.id !== id);
        writeStorageJson(LOCAL_MEMBERS_STORAGE_KEY, localMembers);
        return true;
      }
      throw error;
    }
  },

  async updatePromo(id, payload) {
    if (isTableUnavailable("produk")) {
      return updateLocalRow(LOCAL_PROMOS_STORAGE_KEY, id, payload);
    }

    try {
      const response = await axios.patch(`${PROMOS_URL}?id=eq.${encodeURIComponent(id)}`, payload, {
        headers: { ...headers, Prefer: "return=representation" },
      });
      return (response.data && response.data[0]) || null;
    } catch (error) {
      logSupabaseError(`Gagal mengupdate promo ID ${id}`, error);
      if (isMissingTableError(error)) {
        markTableUnavailable("produk")
        return updateLocalRow(LOCAL_PROMOS_STORAGE_KEY, id, payload);
      }
      throw error;
    }
  },

  async registerUser(userData) {
    const response = await axios.post(USERS_URL, userData, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data;
  },
};
