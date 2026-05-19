export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto w-full font-outfit">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-50">
            {headers.map((header, index) => (
              <th key={index} className="pb-4 px-4 font-bold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-800">
          {children}
        </tbody>
      </table>
    </div>
  );
}