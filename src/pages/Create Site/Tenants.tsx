import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Tenants: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== "create";

  const [form, setForm] = useState({
    tenant_code: "",
    tenant_name: "",
    legal_name: "",
    gst_number: "",
    pan_number: "",
    contact_person: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    city_id: "",
    state_code: "",
    country_code: "",
    postal_code: "",
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", form);
    navigate("/TenantsList");
  };

  const inputClass =
    "w-full h-9 border border-gray-300 rounded px-3 text-[13px] outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb] bg-white";

  const Field = ({
    label,
    name,
    placeholder,
    required,
    span,
  }: {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    span?: "col-span-2" | "col-span-3";
  }) => (
    <div className={span ?? ""}>
      <label className="block text-[13px] font-medium text-[#16191f] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={(form as any)[name]}
        onChange={handleChange}
        placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
        className={inputClass}
      />
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="col-span-3 mt-2">
      <p className="text-[11px] font-semibold text-[#545b64] uppercase tracking-widest mb-2">
        {title}
      </p>
      <hr className="border-gray-300 mb-4" />
    </div>
  );

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <h2 className="text-[20px] font-semibold text-[#16191f] mb-1">
        {isEdit ? `Edit Tenant #${id}` : "Create Tenant"}
      </h2>
      <p className="text-[13px] text-[#545b64] mb-8">
        {isEdit
          ? "Update the tenant details below."
          : "Fill in the details to create a new tenant."}
      </p>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">

        {/* Basic Information */}
        <SectionHeader title="Basic Information" />
        <Field label="Tenant Code"  name="tenant_code"  required />
        <Field label="Tenant Name"  name="tenant_name"  required />
        <Field label="Legal Name"   name="legal_name"   placeholder="Enter legal name" />
        <Field label="GST Number"   name="gst_number"   placeholder="Enter gst number" />
        <Field label="PAN Number"   name="pan_number"   placeholder="Enter pan number" />
        <div /> {/* fills 3rd slot */}

        {/* Contact Details */}
        <SectionHeader title="Contact Details" />
        <Field label="Contact Person" name="contact_person" placeholder="Enter contact person" />
        <Field label="Phone"          name="phone"          placeholder="e.g. +919629795601" />
        <Field label="Email"          name="email"          placeholder="Enter email address" />

        {/* Address */}
        <SectionHeader title="Address" />
        <Field label="Address Line 1" name="address_line1" placeholder="Enter address line 1" span="col-span-2" />
        <Field label="Address Line 2" name="address_line2" placeholder="Enter address line 2" span="col-span-2" />
        <div />
        <Field label="City ID"      name="city_id"      placeholder="Enter city ID" />
        <Field label="State Code"   name="state_code"   placeholder="e.g. TN" />
        <Field label="Country Code" name="country_code" placeholder="e.g. IN" />
        <Field label="Postal Code"  name="postal_code"  placeholder="e.g. 628952" />
        <div className="col-span-2" />

        {/* Status */}
        <SectionHeader title="Status" />
        <div>
          <label className="block text-[13px] font-medium text-[#16191f] mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={handleSubmit}
          className="h-9 px-6 bg-[#ec7211] hover:bg-[#d05c05] text-white text-[13px] font-medium rounded transition-colors"
        >
          {isEdit ? "Update" : "Create"}
        </button>
        <button
          onClick={() => navigate("/TenantsList")}
          className="h-9 px-6 border border-[#0073bb] text-[#0073bb] text-[13px] rounded hover:bg-blue-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Tenants;