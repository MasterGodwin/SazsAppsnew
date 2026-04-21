import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../component/DataDisplay/Table";

const TenantsList: React.FC = () => {
  const navigate = useNavigate();

  const tenants = [
    { id: 1, name: "Sazs Quarry",      code: "SQ001",  status: "Active"   },
    { id: 2, name: "Blue Metal Works", code: "BMW002", status: "Active"   },
    { id: 3, name: "RMC Suppliers",    code: "RMC003", status: "Inactive" },
  ];

  const columns = [
    {
      key: "id" as const,
      label: "ID",
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-500 font-medium font-mono">
          #{value.toString().padStart(3, "0")}
        </span>
      ),
    },
    {
      key: "name" as const,
      label: "Tenant Name",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "code" as const,
      label: "Code",
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-gray-600">{value}</span>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "id" as const,
      label: "Actions",
      render: (_: any, row: typeof tenants[0]) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => alert(`Editing tenant: ${row.name}`)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`Viewing tenant: ${row.name}`)}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm hover:underline transition-colors"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <Table
        title="Tenants"
        subtitle="Manage your tenant organizations"
        data={tenants}
        columns={columns}
        searchPlaceholder="Search tenants..."
        actions={
          <button
            onClick={() => navigate("/tenants/create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-lg leading-none">+</span>
            Create New Tenant
          </button>
        }
      />
    </div>
  );
};

export default TenantsList;