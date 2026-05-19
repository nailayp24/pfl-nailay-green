export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto py-8 px-8 font-outfit ${className}`}>
      {children}
    </div>
  );
}