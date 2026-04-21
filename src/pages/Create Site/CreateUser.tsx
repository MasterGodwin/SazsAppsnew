import React, { useState } from "react";
import Card from "../../component/DataDisplay/Card";

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState({
    displayname: "",
    full_name: "",
    email: "",
    password: "",
    tenant_id: "",
    is_tenant_admin: false,
    is_active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating User:", formData);
    alert("User created successfully! (Demo)");
  };

  return (
    <div className="p-6 lg:p-8">

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create User</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add a new user to the system
        </p>
      </div>

      <div className="max-w-2xl">
        <Card
          title="User Details"
          subtitle="Fill in all required information"
        >
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Display Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="displayname"
                    value={formData.displayname}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="e.g. srikanth_s"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="e.g. Srikanth S"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="e.g. srikanth@example.com"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tenant ID
                  </label>
                  <input
                    type="text"
                    name="tenant_id"
                    value={formData.tenant_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono placeholder:text-gray-400"
                    placeholder="uuid"
                  />
                </div>

              </div>
            </div>

            {/* Permissions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Permissions & Status
              </h3>
              <div className="flex flex-wrap gap-8">

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_tenant_admin"
                    checked={formData.is_tenant_admin}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Tenant Admin
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Active
                  </span>
                </label>

              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-semibold text-sm transition-all text-gray-700"
              >
                Cancel
              </button>
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateUser;