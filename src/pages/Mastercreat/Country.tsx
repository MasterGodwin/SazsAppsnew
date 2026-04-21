import React, { useState, useMemo } from "react";
import Card from "../../component/DataDisplay/Card";
import Table from "../../component/DataDisplay/Table";

interface Country {
  country_code: string;
  country_name: string;
}

const Country: React.FC = () => {
  const [formData, setFormData] = useState({ country_code: "", country_name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Country[]>([
    { country_code: "IN", country_name: "India"  },
    { country_code: "UA", country_name: "Dubai"  },
  ]);

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countries;
    const term = searchTerm.toLowerCase();
    return countries.filter(
      (c) =>
        c.country_code.toLowerCase().includes(term) ||
        c.country_name.toLowerCase().includes(term)
    );
  }, [countries, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.country_code && formData.country_name) {
      setCountries([...countries, formData]);
      setFormData({ country_code: "", country_name: "" });
      alert("Country created successfully!");
    }
  };

  const columns = [
    {
      key: "country_code" as const,
      label: "Country Code",
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 font-mono">
          {value}
        </span>
      ),
    },
    {
      key: "country_name" as const,
      label: "Country Name",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* Top row: Heading LEFT — Search RIGHT */}
      <div className="flex items-start justify-between gap-4 mb-6">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Country Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage countries</p>
        </div>

        {/* Search */}
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
            placeholder="Search by code or name..."
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

      {/* Left + Right Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* LEFT — Create Form Card */}
        <div className="w-full lg:w-102 flex-shrink-0">
          <Card
            title="Create Country"
            subtitle="Add a new country to the system"
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.country_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      country_code: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono placeholder:text-gray-400"
                  placeholder="e.g. IN"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.country_name}
                  onChange={(e) =>
                    setFormData({ ...formData, country_name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="e.g. India"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              >
                + Create Country
              </button>

            </form>
          </Card>
        </div>

        {/* RIGHT — Table */}
        <div className="flex-1 min-w-0">
          <Table
            data={filteredCountries}
            columns={columns}
            searchable={false}
          />
        </div>

      </div>
    </div>
  );
};

export default Country;