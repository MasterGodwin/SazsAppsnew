import React, { useState, useRef, useEffect } from "react";
import { Logo, IcTerminal, IcBell, IcGear, IcSearch } from "./Icons";
import SearchDropdown from "./SearchDropdown";

interface HeaderProps {
  region?:            string;
  accountId?:         string;
  accountName?:       string;
  notificationCount?: number;
  onSelect?:          (path: string, tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  notificationCount = 6,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleClose = () => {
    setDropdownOpen(false);
    setSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setDropdownOpen(value.length > 0 || true);
  };

  const handleSelect = (path: string, tab: string) => {
    handleClose();
    onSelect?.(path, tab);   
  };

  return (
    <header
      className="flex items-center h-[50px] bg-[#161d26] shrink-0 z-50 divide-x divide-white/10"
      style={{ fontFamily: "'Amazon Ember','Helvetica Neue',Arial,sans-serif" }}
    >
      <div className="flex items-center gap-3 px-4 h-full">
        <Logo />
      </div>

      <div className="flex-1 px-4 h-full flex items-center">
        <div ref={searchRef} className="relative w-full max-w-2xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <IcSearch />
          </span>

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Search..."
            className="w-full h-[34px] bg-[#212427] text-white placeholder-gray-400 rounded pl-10 pr-24 text-[13px] outline-none focus:ring-1 focus:ring-[#4d9eff] transition-all"
          />

          {dropdownOpen ? (
            <button
              onClick={handleClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3b9dd2] text-xs hover:text-white transition-colors"
            >
              ✕
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 bg-[#2a2f38] px-1.5 py-px rounded">
              Alt + S
            </div>
          )}

          {dropdownOpen && (
            <SearchDropdown
              query={search}
              onClose={handleClose}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>

      <div className="flex items-center px-2 h-full gap-1">
        {[<IcTerminal />, <IcBell />, <IcGear />].map((icon, i) => (
          <button
            key={i}
            className="relative w-9 h-9 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            {icon}
            {i === 1 && notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-[9px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;