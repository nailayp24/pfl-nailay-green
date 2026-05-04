// components/PageHeader.jsx
import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
    // Handle breadcrumb yang bisa berupa string atau array
    const renderBreadcrumb = () => {
        if (Array.isArray(breadcrumb)) {
            return breadcrumb.join(" / ");
        }
        return breadcrumb;
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <span className="text-gray-400 hover:text-green-500 cursor-pointer">Dashboard</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600 font-semibold">
                        {renderBreadcrumb()}
                    </span>
                </div>
            </div>
            {/* Pastikan children di-render di sini */}
            {children && (
                <div className="flex-shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}