import React, { useState, useMemo } from "react";
import Card from "../../component/DataDisplay/Card";
import Table from "../../component/DataDisplay/Table";

interface City {
  city_id: number;
  city_name: string;
  state_code: string;
}

const City: React.FC = () => {
  const [formData, setFormData] = useState({ city_name: "", state_code: "TN" });
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([
    { city_id: 20, city_name: "Chennai",          state_code: "TN" },
    { city_id: 22, city_name: "Kovalam",           state_code: "KL" },
    { city_id: 23, city_name: "Kayathar",          state_code: "TN" },
    { city_id: 16, city_name: "Tirunelveli",       state_code: "TN" },
    { city_id: 24, city_name: "R S M Blue Metal",  state_code: "TN" },
  ]);

  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) return cities;
    const term = searchTerm.toLowerCase();
    return cities.filter(
      (c) =>
        c.city_name.toLowerCase().includes(term) ||
        c.state_code.toLowerCase().includes(term)
    );
  }, [cities, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.city_name && formData.state_code) {
      const newCity: City = {
        city_id: Math.max(0, ...cities.map((c) => c.city_id)) + 1,
        city_name: formData.city_name,
        state_code: formData.state_code,
      };
      setCities([...cities, newCity]);
      setFormData({ city_name: "", state_code: "TN" });
      alert("City created successfully!");
    }
  };

  const columns = [
    {
      key: "city_id" as const,
      label: "City ID",
      sortable: true,
      render: (value: number) => (
        <span className="font-mono text-gray-500 font-medium">
          #{value.toString().padStart(3, "0")}
        </span>
      ),
    },
    {
      key: "city_name" as const,
      label: "City Name",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "state_code" as const,
      label: "State",
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 font-mono">
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* ── Top row: Heading LEFT — Search RIGHT ── */}
      <div className="flex items-start justify-between gap-4 mb-6">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">City Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage cities</p>
        </div>

        {/* Search bar — top-right, same row as heading */}
        <div className="relative flex-shrink-0">
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
            placeholder="Search by city or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-64 placeholder:text-gray-400"
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
      </div>

      {/* ── Left + Right Layout — both start at same top ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* LEFT — Create Form Card */}
        <div className="w-full lg:w-102 flex-shrink-0">
          <Card
            title="Create City"
            subtitle="Add a new city to the system"
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  City Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city_name}
                  onChange={(e) =>
                    setFormData({ ...formData, city_name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="e.g. Chennai"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  State Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.state_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state_code: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono placeholder:text-gray-400"
                  placeholder="e.g. TN"
                  maxLength={3}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              >
                + Create City
              </button>

            </form>
          </Card>
        </div>

        {/* RIGHT — Table (no extra wrapper needed) */}
        <div className="flex-1 min-w-0">
          <Table
            data={filteredCities}
            columns={columns}
            searchable={false}
          />
        </div>

      </div>
    </div>
  );
};

export default City;