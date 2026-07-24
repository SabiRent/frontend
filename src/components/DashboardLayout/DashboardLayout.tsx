import { Outlet } from "react-router";

import Sidebar from "@/components/Sidebar/Sidebar";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
