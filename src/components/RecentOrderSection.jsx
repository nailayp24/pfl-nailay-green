import Card from "./Card";

export default function RecentOrderSection({ children }) {
  return (
    <Card className="space-y-6 mt-8 font-outfit">
      <h2 className="text-base font-extrabold text-gray-800 tracking-tight">Recent Order</h2>
      {children}
    </Card>
  );
}