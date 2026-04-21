import React from "react";
import Table from "../../component/DataDisplay/Table";   // Adjust path if needed

const BranchList: React.FC = () => {
  const branches = [
    { 
      id: 1, 
      name: "Chennai Main", 
      tenant: "Sazs Quarry", 
      code: "CH01",
      status: "Active",
      contact: "Srikanth S"
    },
    { 
      id: 2, 
      name: "Madurai Branch", 
      tenant: "Sazs Quarry", 
      code: "MD02",
      status: "Active",
      contact: "Ramesh K"
    },
    { 
      id: 3, 
      name: "Coimbatore", 
      tenant: "Blue Metal Works", 
      code: "CB03",
      status: "Inactive",
      contact: "Priya M"
    },
  ];

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Branch Name", sortable: true },
    { key: "tenant", label: "Tenant", sortable: true },
    { key: "code", label: "Branch Code", sortable: false },
    { key: "contact", label: "Contact Person" },
    { 
      key: "status", 
      label: "Status",
      render: (value: string) => (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          value === "Active" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-500 mt-1">Manage branches across all tenants</p>
        </div>

        <button
          onClick={() => (window.location.href = "/branches/create")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="text-xl leading-none">+</span>
          Create New Branch
        </button>
      </div>

      {/* Using Table Component */}
      <Table 
        data={branches} 
        columns={columns} 
        searchable={true}
        searchPlaceholder="Search branches by name, tenant or code..."
      />

      {/* Summary */}
      <div className="text-center text-gray-400 text-xs mt-6">
        Total Branches: {branches.length}
      </div>
    </div>
  );
};

export default BranchList;