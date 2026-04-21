import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchDropdownProps {
  query?: string;
  onClose?: () => void;
  onSelect?: (path: string, tab: string) => void;
}

const ALL_ITEMS = [
  { tab: "site",   group: "NAVIGATION", label: "Create Site",    path: "/site/dashboard" },
  { tab: "master", group: "NAVIGATION", label: "Master",         path: "/master/dashboard" },
  { tab: "site",   group: "TENANT",     label: "Create Tenant",  path: "/tenants/create" },
  { tab: "site",   group: "TENANT",     label: "Tenant List",    path: "/TenantsList" },
  { tab: "site",   group: "BRANCH",     label: "Create Branch",  path: "/branches/create" },
  { tab: "site",   group: "BRANCH",     label: "Branch List",    path: "/branches" },
  { tab: "site",   group: "USER",       label: "Create User",    path: "/users/create" },
  { tab: "site",   group: "USER",       label: "User List",      path: "/users" },
  { tab: "master", group: "MASTER",     label: "Country Create", path: "/master/country/create" },
  { tab: "master", group: "MASTER",     label: "State Create",   path: "/master/state/create" },
  { tab: "master", group: "MASTER",     label: "City Create",    path: "/master/city/create" },
  { tab: "working-directory", group: "WORKING DIRECTORY", label: "Input Fields", path: "/working-directory/input-fields" },
  { tab: "working-directory", group: "WORKING DIRECTORY", label: "Tables",       path: "/working-directory/tables" },
  { tab: "working-directory", group: "WORKING DIRECTORY", label: "Dropdown",     path: "/working-directory/dropdown" },
  { tab: "working-directory", group: "WORKING DIRECTORY", label: "Checkbox",     path: "/working-directory/checkbox" },
];

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  query = "",
  onClose,
  onSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();  

  const handleSelect = (path: string, tab: string) => {
    onSelect?.(path, tab);
    onClose?.();
    navigate(path);
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const result: Record<string, typeof ALL_ITEMS> = {};
    filteredItems.forEach((item) => {
      if (!result[item.group]) result[item.group] = [];
      result[item.group].push(item);
    });
    return result;
  }, [filteredItems]);

  return (
    <div
      className="absolute top-[calc(100%+4px)] left-0 z-[999] overflow-hidden"
      style={{
        width: 660,
        maxHeight: 480,
        background: "#1a2332",
        border: "1px solid #2d3748",
        borderRadius: 6,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <div className="p-3 overflow-y-auto" style={{ maxHeight: 480 }}>

        {filteredItems.length === 0 && query.trim() ? (
          <div className="text-gray-400 text-center py-10 text-sm">
            No results for{" "}
            <span className="text-white">"{query}"</span>
          </div>
        ) : (
          Object.entries(grouped).map(([groupName, groupItems]) => (
            <div key={groupName} className="mb-4">

              <div className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5 px-1 uppercase">
                {groupName}
              </div>

              {groupItems.map((item) => {
                const isActive = location.pathname === item.path; 

                return (
                  <div
                    key={item.path}
                    onClick={() => handleSelect(item.path, item.tab)}
                    className="px-3 py-2.5 text-[13px] rounded cursor-pointer transition-colors mb-0.5 flex items-center justify-between"
                    style={{
                      background: isActive ? "#1e3a5f" : "transparent",
                      color: isActive ? "#3b9dd2" : "#ffffff",
                      borderLeft: isActive ? "3px solid #3b9dd2" : "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    <span>{item.label}</span>

                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#3b9dd2" }}
                      />
                    )}
                  </div>
                );
              })}

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default SearchDropdown;