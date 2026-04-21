import React from 'react';

interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  avatar?: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
  className?: string;
  emptyMessage?: string;
}

const List: React.FC<ListProps> = ({
  items,
  className = "",
  emptyMessage = "No items found"
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={item.onClick}
          className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          {item.avatar && (
            <img
              src={item.avatar}
              alt={item.title}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}

          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{item.title}</p>
            {item.subtitle && (
              <p className="text-sm text-gray-500 truncate">{item.subtitle}</p>
            )}
          </div>

          {item.badge && (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.badgeColor || 'bg-blue-100 text-blue-700'}`}>
              {item.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;