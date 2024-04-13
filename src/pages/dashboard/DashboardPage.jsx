import React from "react";
import AdminLayout from "../../components/defaultLayout/AdminLayout";
import Dashboard from "../../components/feature/Dashboard";

const DashboardPage = () => {
  return (
    <div>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </div>
  );
};

export default DashboardPage;
