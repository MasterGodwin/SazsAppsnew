import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";

import CreateSiteDashboard from "./pages/Create Site/CreateSiteDashboard.tsx";
import Tenants from "./pages/Create Site/Tenants.tsx";
import TenantsList from "./pages/Create Site/TenantsList.tsx";
import BranchCreate from "./pages/Create Site/Branchcreat.tsx";
import BranchList from "./pages/Create Site/Branchlist.tsx";
import UserCreate from "./pages/Create Site/CreateUser.tsx";
import UserList from "./pages/Create Site/UserList.tsx";

import MasterDashboard from "./pages/Mastercreat/MasterDashboard.tsx";
import Country from "./pages/Mastercreat/Country.tsx";
import State from "./pages/Mastercreat/State.tsx";
import City from "./pages/Mastercreat/City.tsx";

import Login from "./pages/login.tsx";
import InputFieldsPage from "./pages/working directory/InputFields.tsx";
import TablesPage from "./pages/working directory/Tables.tsx";
import DropdownPage from "./pages/working directory/Dropdown.tsx";
import Checkbox from "./pages/working directory/Checkbox.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/site/dashboard" replace />} />

          <Route path="site/dashboard" element={<CreateSiteDashboard />} />
          <Route path="tenants/create" element={<Tenants />} />
          <Route path="TenantsList" element={<TenantsList />} />
          <Route path="branches/create" element={<BranchCreate />} />
          <Route path="branches" element={<BranchList />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users" element={<UserList />} />

          <Route path="master/dashboard" element={<MasterDashboard />} />
          <Route path="master/country/create" element={<Country />} />
          <Route path="master/state/create" element={<State />} />
          <Route path="master/city/create" element={<City />} />
          <Route path="working-directory/input-fields" element={<InputFieldsPage />} />
          <Route path="working-directory/tables" element={<TablesPage />} />
          <Route path="working-directory/dropdown" element={<DropdownPage />}  />
          <Route path="working-directory/checkbox" element={<Checkbox />} />
          <Route path="*" element={<Navigate to="/site/dashboard" replace />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;