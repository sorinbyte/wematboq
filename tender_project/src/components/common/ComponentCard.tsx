import React from "react";

interface ComponentCardProps {
  title?: string; // made optional
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  const hasHeader = title || desc;

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Conditional Card Header */}
      {hasHeader && (
        <div className="px-6 py-5">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h2>
          )}
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className={`p-4 ${hasHeader ? "border-t border-gray-100 dark:border-gray-800" : ""} sm:p-6`}>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;