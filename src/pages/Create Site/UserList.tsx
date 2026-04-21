import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../component/DataDisplay/Table";

interface User {
  user_id: string;
  displayname: string;
  full_name: string;
  email: string;
  tenant_id: string;
  is_tenant_admin: boolean;
  is_active: boolean;
  created_at: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [users] = useState<User[]>([
    {
      user_id: "a1b2c3d4-0001",
      displayname: "srikanth_s",
      full_name: "Srikanth S",
      email: "srikanth@example.com",
      tenant_id: "tenant-001",
      is_tenant_admin: true,
      is_active: true,
      created_at: "2024-01-15",
    },
    {
      user_id: "a1b2c3d4-0002",
      displayname: "john_d",
      full_name: "John Doe",
      email: "john@example.com",
      tenant_id: "tenant-001",
      is_tenant_admin: false,
      is_active: true,
      created_at: "2024-02-20",
    },
    {
      user_id: "a1b2c3d4-0003",
      displayname: "jane_s",
      full_name: "Jane Smith",
      email: "jane@example.com",
      tenant_id: "tenant-002",
      is_tenant_admin: false,
      is_active: false,
      created_at: "2024-03-10",
    },
  ]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.displayname.toLowerCase().includes(term) ||
        u.full_name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.tenant_id.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const columns = [
    {
      key: "displayname" as const,
      label: "Display Name",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "full_name" as const,
      label: "Full Name",
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      key: "email" as const,
      label: "Email",
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
    },
    {
      key: "is_tenant_admin" as const,
      label: "Admin",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700">
            Admin
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-500">
            User
          </span>
        ),
    },
    {
      key: "is_active" as const,
      label: "Status",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Inactive
          </span>
        ),
    },
    {
      key: "created_at" as const,
      label: "Created",
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-500 text-sm">{value}</span>
      ),
    },
    {
      key: "user_id" as const,
      label: "Actions",
      render: (_: any, row: User) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(`Edit: ${row.full_name}`)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`View: ${row.full_name}`)}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium hover:underline transition-colors"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* Top row: Heading LEFT — Search + Button RIGHT */}
      <div className="flex items-start justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all system users
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-56 placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Create Button */}
          <button
            onClick={() => navigate("/users/create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-base leading-none">+</span>
            Create User
          </button>

        </div>
      </div>

      {/* Table */}
      <Table
        data={filteredUsers}
        columns={columns}
        searchable={false}
      />

    </div>
  );
};

export default UserList;