import { FaUser, FaCrown } from "react-icons/fa";

export default function MemberProfile() {
  const session = JSON.parse(localStorage.getItem("user_session"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Profil Member</h1>
        <p className="text-gray-500 text-sm">
          Informasi akun member.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <FaUser />
          <h3 className="font-bold">Data Member</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Nama</p>
            <p className="font-bold">
              {session?.full_name || session?.fullName}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-bold">
              {session?.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Membership</p>

            <div className="inline-flex items-center gap-2 bg-[#DEE33E]/20 px-3 py-2 rounded-xl mt-1">
              <FaCrown />
              <span className="font-bold">
                {session?.levelMembership || "Regular Member"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}