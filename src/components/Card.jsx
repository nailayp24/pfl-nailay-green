export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-[24px] shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}