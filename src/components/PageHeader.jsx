import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.join(" / ");
    }
    return breadcrumb;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm mt-2 font-medium">
          <span className="text-gray-400 hover:text-[#9FA324] transition-colors cursor-pointer">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-semibold">
            {renderBreadcrumb()}
          </span>
        </div>
      </div>
     
      {children && (
        <div className="flex-shrink-0 w-full md:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}