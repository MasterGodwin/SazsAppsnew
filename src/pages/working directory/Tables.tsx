import React, { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

// ── Status Badge ─────────────────────────────────────────────────────────────
export const StatusBadge: React.FC<{ status: "active" | "inactive" | "pending" }> = ({ status }) => {
  const styles = {
    active:   "bg-green-100 text-green-700 border border-green-200",
    inactive: "bg-gray-100 text-gray-600 border border-gray-200",
    pending:  "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ── Generic Table Component ───────────────────────────────────────────────────
export function DataTable<T>({
  columns, data, keyField, loading, emptyMessage = "No records found.", onRowClick,
}: TableProps<T>) {
  return (
    <div className="border border-[#e9ebed] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[#f2f3f3] border-b border-[#e9ebed]">
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="text-left px-4 py-[10px] font-semibold text-[#545b64] uppercase tracking-wide text-[11px]"
                  style={col.width ? { width: col.width } : {}}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-[#879596]">
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-[#879596]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={String(row[keyField])}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    border-b border-[#e9ebed] transition-colors
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}
                    ${onRowClick ? "cursor-pointer hover:bg-[#f0f8ff]" : ""}
                  `}
                >
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-4 py-[9px] text-[#16191f]">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Demo Page ─────────────────────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  branch: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const SAMPLE_DATA: User[] = [
  { id: 1, name: "Arjun Kumar",   branch: "Coimbatore HQ", role: "Admin",    status: "active" },
  { id: 2, name: "Priya Nair",    branch: "Chennai",        role: "Manager",  status: "active" },
  { id: 3, name: "Ravi Shankar",  branch: "Bangalore",      role: "Employee", status: "inactive" },
  { id: 4, name: "Meena Devi",    branch: "Coimbatore HQ", role: "Employee", status: "pending" },
  { id: 5, name: "Suresh Babu",   branch: "Hyderabad",      role: "Manager",  status: "active" },
];

const COLUMNS: Column<User>[] = [
  { key: "id",     header: "ID",     width: "60px" },
  { key: "name",   header: "Name" },
  { key: "branch", header: "Branch" },
  { key: "role",   header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (val) => <StatusBadge status={val as User["status"]} />,
  },
  {
    key: "id",
    header: "Actions",
    render: (_, row) => (
      <div className="flex gap-2">
        <button
          onClick={e => { e.stopPropagation(); alert("Edit: " + row.name); }}
          className="px-3 py-1 text-[12px] border border-[#0073bb] text-[#0073bb] rounded hover:bg-[#f0f8ff] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={e => { e.stopPropagation(); alert("Delete: " + row.name); }}
          className="px-3 py-1 text-[12px] border border-red-400 text-red-500 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    ),
  },
];

const TablesPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_DATA.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#16191f]">User Table</h2>
        <div className="flex gap-3 items-center">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or branch…"
            className="border border-[#aab7b8] rounded-md px-3 py-[6px] text-[13px] outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb] w-64"
          />
          <button className="px-4 py-[7px] bg-[#0073bb] text-white text-[13px] font-medium rounded-md hover:bg-[#005f99] transition-colors">
            + Add User
          </button>
        </div>
      </div>
      <DataTable
        columns={COLUMNS}
        data={filtered}
        keyField="id"
        emptyMessage="No users match your search."
        onRowClick={row => alert("Row clicked: " + row.name)}
      />
      <p className="text-[12px] text-[#545b64] mt-2">{filtered.length} record(s)</p>
    </div>
  );
};

export default TablesPage;