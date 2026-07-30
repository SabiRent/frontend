import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

// import logo from "@/assets/images/logo.png";
import logo from "@/assets/images/logo.svg";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const DashboardLayout = () => {
  useCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col md:ml-[270px]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex size-10 items-center justify-center rounded-xl text-[#173B67] transition hover:bg-[#EAF3F7] focus:outline-none focus:ring-2 focus:ring-[#167589]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <img src={logo} alt="MyCompound" className="h-7 w-auto" />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
