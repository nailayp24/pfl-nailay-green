export default function Badge({ children, type = "success" }) {
  const types = {
    success: "bg-green-50 text-green-600 border border-green-100", // Untuk status Completed
    warning: "bg-yellow-50 text-[#9FA324] border border-[#DEE33E]/30", // Untuk status Pending
    danger: "bg-red-50 text-red-600 border border-red-100",
  };

  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-bold inline-block`}>
      {children}
    </span>
  );
}