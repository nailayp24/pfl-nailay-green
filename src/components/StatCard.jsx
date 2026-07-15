import Card from "./Card";

export default function StatCard({ title, value, trend, icon, isNegative }) {
  const Icon = icon;

  return (
    <Card className="flex items-center justify-between min-w-[280px] flex-1 font-outfit">
      <div className="space-y-1">
        <span className={`text-[11px] font-bold tracking-wide rounded px-2 py-0.5 float-right ${isNegative ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
          {trend}
        </span>
        <p className="text-gray-400 text-xs font-semibold uppercase">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-800 pt-1">{value}</h3>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 flex items-center justify-center">
        <Icon className="text-xl" />
      </div>
    </Card>
  );
}