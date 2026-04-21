import React from "react";

const CreateSiteDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create Site Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage Tenants, Branches & Users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Tenants</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">24</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Active Branches</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">87</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Users</h3>
          <p className="text-4xl font-bold text-[#0073bb] mt-2">156</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
          <p className="text-4xl font-bold text-orange-500 mt-2">7</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Create Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-5">Quick Create</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-[#0073bb] hover:text-white rounded-lg transition-all flex justify-between items-center">
              <span className="font-medium">Create New Tenant</span>
              <span>→</span>
            </button>
            <button className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-[#0073bb] hover:text-white rounded-lg transition-all flex justify-between items-center">
              <span className="font-medium">Create New Branch</span>
              <span>→</span>
            </button>
            <button className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-[#0073bb] hover:text-white rounded-lg transition-all flex justify-between items-center">
              <span className="font-medium">Create New User</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>
          <div className="space-y-4 text-sm">
            <p className="text-gray-600">• New tenant <strong>ABC Corp</strong> created</p>
            <p className="text-gray-600">• Branch added in Chennai</p>
            <p className="text-gray-600">• 3 new users registered today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSiteDashboard;