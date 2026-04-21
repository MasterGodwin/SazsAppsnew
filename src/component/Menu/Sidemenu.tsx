import React, { useState } from "react";
import { IcChevD, IcChevR } from "../Icons";

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  children?: NavItem[];
}

interface SideMenuProps {
  items: NavItem[];
  activeId: string;
  onNavigate: (item: NavItem) => void;
}

export const Createsite_NAV: NavItem[] = [
  {
    id: "create-site-dashboard",
    label: "Create Site Dashboard",
    path: "/site/dashboard"
  },
  {
    id: "g-tenant",
    label: "TENANT",
    children: [
      { id: "tenant-create", label: "Create Tenant", path: "/tenants/create" },
      { id: "tenant-list", label: "Tenant List", path: "/TenantsList" },
    ],
  },
  {
    id: "g-branch",
    label: "BRANCH",
    children: [
      { id: "branch-create", label: "Create Branch", path: "/branches/create" },
      { id: "branch-list", label: "Branch List", path: "/branches" },
    ],
  },
  {
    id: "g-user",
    label: "USER",
    children: [
      { id: "user-create", label: "Create User", path: "/users/create" },
      { id: "user-list", label: "User List", path: "/users" },
    ],
  },
  
];


const SideMenu: React.FC<SideMenuProps> = ({ items, activeId, onNavigate }) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["g-tenant", "g-branch", "g-user"]) 
  );

  const toggleGroup = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <nav 
      className="py-2 overflow-x-hidden" 
      style={{ minWidth: 224 }}
    >
      {items.map(item => {
        const isGroup = !!item.children;
        const groupOpen = expanded.has(item.id);

        // Standalone Top-Level Item
        if (!isGroup) {
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item)}
              className={`
                w-full text-left px-4 py-[8px] text-[13px] font-medium transition-colors rounded-md
                ${activeId === item.id
                  ? "bg-[#0073bb] text-white"
                  : "text-[#16191f] hover:bg-[#f2f3f3]"
                }
              `}
            >
              {item.label}
            </button>
          );
        }

        // Group Items
        return (
          <div key={item.id} className="mb-1">
          
            <button
              onClick={() => toggleGroup(item.id)}
              className="w-full flex items-center justify-between px-4 py-[8px] text-[11px] font-bold uppercase tracking-widest text-[#545b64] hover:bg-[#f2f3f3] transition-colors"
            >
              <span>{item.label}</span>
              {groupOpen ? <IcChevD /> : <IcChevR />}
            </button>

            {/* Child Items */}
            {groupOpen &&
              item.children!.map((child) => (
                <button
                  key={child.id}
                  onClick={() => onNavigate(child)}
                  className={`
                    w-full text-left px-4 pl-9 py-[6px] text-[13px] transition-colors rounded-md
                    ${activeId === child.id
                      ? "bg-[#0073bb] text-white font-medium"
                      : "text-[#16191f] hover:bg-[#f2f3f3]"
                    }
                  `}
                >
                  {child.label}
                </button>
              ))}
          </div>
        );
      })}
    </nav>
  );
};

export default SideMenu;