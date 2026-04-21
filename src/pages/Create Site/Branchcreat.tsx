import React, { useState, useEffect } from "react";

const BranchCreate: React.FC = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    tenant: "Sazs Quarry",
    branchCode: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "Coimbatore",
    state: "TN",
    country: "IN",
    postalCode: "641001",
    isHeadOffice: false,
    status: "ACTIVE",
  });

  useEffect(() => {
    if (formData.branchName.trim()) {
      const generatedCode = generateBranchCode(formData.branchName);
      setFormData((prev) => ({ ...prev, branchCode: generatedCode }));
    }
  }, [formData.branchName]);

  const generateBranchCode = (name: string): string => {
    let prefix = name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (prefix.length < 2) prefix = name.toUpperCase().slice(0, 2);

    const existingCodes = ["CH01", "MD02", "CB03"];
    let sequence = 1;
    while (
      existingCodes.includes(`${prefix}${sequence.toString().padStart(2, "0")}`)
    ) {
      sequence++;
    }
    return `${prefix}${sequence.toString().padStart(2, "0")}`;
  };

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
    console.log("Creating Branch:", formData);
    alert("Branch created successfully! (Demo)");
  };

  return (
    <div className="p-6 lg:p-8">
      <div className=" mx-auto">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Branch</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to create a new branch
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Chennai Main Branch"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tenant
                </label>
                <select
                  name="tenant"
                  value={formData.tenant}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Sazs Quarry">Sazs Quarry</option>
                  <option value="Blue Metal Works">Blue Metal Works</option>
                  <option value="RMC Suppliers">RMC Suppliers</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Branch Code (Auto-generated)
                </label>
                <input
                  type="text"
                  value={formData.branchCode}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Generated automatically based on branch name
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Tax Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contact & Tax Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="29ABCDE1234F1Z5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Srikanth S"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 96297 95601"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="srikanthssk2003@gmail.com"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Address
            </h2>
            <div className="space-y-5">
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address Line 2 (Optional)"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="State"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Postal Code"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isHeadOffice"
                checked={formData.isHeadOffice}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600 rounded"
              />
              <span className="text-gray-700 font-medium">
                This is Head Office
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all"
            >
              Create Branch
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchCreate;