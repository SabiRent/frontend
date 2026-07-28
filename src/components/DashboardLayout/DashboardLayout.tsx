import { Outlet } from "react-router";

import Sidebar from "@/components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto bg-[#F8FBFC] px-10 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
