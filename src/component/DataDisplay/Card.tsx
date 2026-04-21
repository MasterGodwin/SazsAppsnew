import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  footer,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="p-6">{children}</div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;