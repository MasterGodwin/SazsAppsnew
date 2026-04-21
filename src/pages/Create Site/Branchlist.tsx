import React from "react";
import Table, { type Column } from "../../component/DataDisplay/Table";

type Branch = {
  id: number;
  name: string;
  tenant: string;
  code: string;
  status: string;
  contact: string;
};

const BranchList: React.FC = () => {
  const branches: Branch[] = [
    { id: 1, name: "Chennai Main", tenant: "Sazs Quarry", code: "CH01", status: "Active", contact: "Srikanth S" },
    { id: 2, name: "Madurai Branch", tenant: "Sazs Quarry", code: "MD02", status: "Active", contact: "Ramesh K" },
    { id: 3, name: "Coimbatore", tenant: "Blue Metal Works", code: "CB03", status: "Inactive", contact: "Priya M" },
  ];

  const columns: Column<Branch>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Branch Name", sortable: true },
    { key: "tenant", label: "Tenant", sortable: true },
    { key: "code", label: "Branch Code" },
    { key: "contact", label: "Contact Person" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 text-xs rounded ${
            value === "Active" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        data={branches}
        columns={columns}
        title="Branches"
        subtitle="Manage all branches"
        searchPlaceholder="Search branches..."
      />
    </div>
  );
};

export default BranchList;