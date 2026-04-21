import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import SubHeader from "./Subheader";
import SideMenu, { Createsite_NAV } from "./Menu/Sidemenu";
import MasterMenu, { Master_NAV } from "./Menu/Mastermenu";
import WorkingDirectorySideMenu from "./Menu/workingdirectory";

const PATH_TO_ID: Record<string, string> = {
  "/site/dashboard": "create-site-dashboard",
  "/master/dashboard": "master-dashboard",
  "/tenants/create": "tenant-create",
  "/TenantsList": "tenant-list",
  "/branches/create": "branch-create",
  "/branches": "branch-list",
  "/users/create": "user-create",
  "/users": "user-list",
  "/master/country/create": "country-create",
  "/master/state/create": "state-create",
  "/master/city/create": "city-create",
  "/working-directory/input-fields": "wd-input-fields",
  "/working-directory/tables": "wd-tables",
  "/working-directory/dropdown": "wd-dropdown",
  "/working-directory/checkbox": "wd-checkbox",
};

const SITE_PATHS = new Set([
  "/site/dashboard", "/tenants/create", "/TenantsList",
  "/branches/create", "/branches", "/users/create", "/users",
]);
const MASTER_PATHS = new Set([
  "/master/dashboard", "/master/country/create",
  "/master/state/create", "/master/city/create",
]);
const WORKING_DIRECTORY_PATHS = new Set([
  "/working-directory/input-fields",
  "/working-directory/tables",
  "/working-directory/dropdown", 
  "/working-directory/checkbox",
]);

type ActiveMenu = "site" | "master" | "working-directory";

const getActiveMenu = (pathname: string): ActiveMenu => {
  if (MASTER_PATHS.has(pathname)) return "master";
  if (WORKING_DIRECTORY_PATHS.has(pathname)) return "working-directory";
  return "site";
};

const PAGE_NAMES: Record<ActiveMenu, string> = {
  "site": "Create Site Dashboard",
  "master": "Master Dashboard",
  "working-directory": "Working Directory",
};

const DEFAULT_IDS: Record<ActiveMenu, string> = {
  "site": "create-site-dashboard",
  "master": "master-dashboard",
  "working-directory": "wd-input-fields",
};

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = getActiveMenu(location.pathname);
  const activeId = PATH_TO_ID[location.pathname] ?? DEFAULT_IDS[activeMenu];
  const pageName = PAGE_NAMES[activeMenu];

  const [sideOpen, setSideOpen] = useState(true);

  const handleNavigate = (item: any) => {
    if (item.path) navigate(item.path);
  };

  const handleSearchSelect = (path: string, tab: string) => {
    navigate(path);
  };

  const renderSideMenu = () => {
    switch (activeMenu) {
      case "master":
        return (
          <MasterMenu
            activeId={activeId}
            onNavigate={handleNavigate}
          />
        );
      case "working-directory":
        return (
          <WorkingDirectorySideMenu
            activeId={activeId}
            onNavigate={handleNavigate}
          />
        );
      case "site":
      default:
        return (
          <SideMenu
            items={Createsite_NAV}
            activeId={activeId}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header onSelect={handleSearchSelect} />

      <SubHeader
        breadcrumbs={[
          { label: activeMenu === "site" ? "Create Site" : activeMenu === "master" ? "Master" : "Working Directory" },
          { label: pageName },
        ]}
        onToggleSidebar={() => setSideOpen((v) => !v)}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`flex-shrink-0 flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300
            ${sideOpen ? "w-56" : "w-0 overflow-hidden"}`}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {renderSideMenu()}
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-white m-4 rounded-2xl shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;