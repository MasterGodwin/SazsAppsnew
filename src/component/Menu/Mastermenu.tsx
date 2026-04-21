import React, { useState } from "react";
import { IcChevD, IcChevR } from "../Icons";

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  children?: NavItem[];
}

interface SideMenuProps {
  activeId: string;
  onNavigate: (item: NavItem) => void;
}

// ── Master Navigation ───────────────────────────────────────────────────────
export const Master_NAV: NavItem[] = [
  {
    id: "master-dashboard",
    label: "Master Dashboard",
    path: "/master/dashboard"
  },
  {
    id: "g-master",
    label: "Master",
    children: [
      { 
        id: "country-create", 
        label: "Country Create", 
        path: "/master/country/create" 
      },
      { 
        id: "state-create", 
        label: "State Create", 
        path: "/master/state/create" 
      },
      { 
        id: "city-create", 
        label: "City Create", 
        path: "/master/city/create" 
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const SideMenu: React.FC<SideMenuProps> = ({ activeId, onNavigate }) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["g-master"]) // Master group open by default
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
      {Master_NAV.map(item => {
        const isGroup = !!item.children;
        const groupOpen = expanded.has(item.id);

        // Top Level Item (Master Dashboard)
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

        // Group with Dropdown (Master)
        return (
          <div key={item.id}>
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(item.id)}
              className="w-full flex items-center justify-between px-4 py-[6px] text-[11px] font-bold uppercase tracking-widest text-[#545b64] hover:bg-[#f2f3f3] transition-colors"
            >
              <span>{item.label}</span>
              {groupOpen ? <IcChevD /> : <IcChevR />}
            </button>

            {/* Child Items */}
            {groupOpen && item.children!.map(child => (
              <button
                key={child.id}
                onClick={() => onNavigate(child)}
                className={`
                  w-full text-left px-4 pl-9 py-[5px] text-[13px] transition-colors rounded-md
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