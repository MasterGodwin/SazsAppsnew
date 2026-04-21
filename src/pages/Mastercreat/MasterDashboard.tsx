import React from "react";

const MasterDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Master Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of all master data management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Countries</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">48</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">States</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">312</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Cities</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">2,845</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0073bb] hover:shadow transition-all text-left">
            <p className="font-medium">Create Country</p>
          </button>
          <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0073bb] hover:shadow transition-all text-left">
            <p className="font-medium">Create State</p>
          </button>
          <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0073bb] hover:shadow transition-all text-left">
            <p className="font-medium">Create City</p>
          </button>
          <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0073bb] hover:shadow transition-all text-left">
            <p className="font-medium">View All Masters</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterDashboard;