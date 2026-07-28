import { Bell, Boxes, Building2, CreditCard, Home, Users } from "lucide-react";

import logo from "@/assets/images/logo.png";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";
import UserProfileDropdown from "@/components/UserProfileDropdown/UserProfileDropdown";
import { AppRoutes } from "@/constants/routes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const user = {
  name: "Raymond Agu",
  email: "raymondagu@gmail.com",
};

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="flex h-screen w-[270px] flex-col bg-[#173B67] px-6 py-8">
      {/* Logo */}
      <div className="mb-8 mb-12">
        <img src={logo} alt="MyCompound" className="w-[170px]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <SidebarItem
          label="Dashboard"
          icon={<Home size={18} />}
          active={location.pathname === "/dashboard"}
          onClick={() => navigate(AppRoutes.dashboard)}
        />

        <SidebarItem
          label="Properties"
          icon={<Building2 size={18} />}
          active={location.pathname === AppRoutes.dashboardProperties}
          onClick={() => navigate(AppRoutes.dashboardProperties)}
        />

        <SidebarItem
          label="Units"
          icon={<Boxes size={18} />}
          active={location.pathname === AppRoutes.dashboardUnits}
          onClick={() => navigate(AppRoutes.dashboardUnits)}
        />

        <SidebarItem
          label="Tenants"
          icon={<Users size={18} />}
          active={location.pathname === AppRoutes.dashboardTenants}
          onClick={() => navigate(AppRoutes.dashboardTenants)}
        />

        <SidebarItem
          label="Payments"
          icon={<CreditCard size={18} />}
          active={location.pathname === AppRoutes.dashboardPayments}
          onClick={() => navigate(AppRoutes.dashboardPayments)}
        />

        <SidebarItem
          label="Notifications"
          icon={<Bell size={18} />}
          active={location.pathname === AppRoutes.dashboardNotifications}
          onClick={() => navigate(AppRoutes.dashboardNotifications)}
        />
      </nav>

      {/* User Profile */}
      <div className="relative mt-auto">
        <div onClick={() => setShowMenu(!showMenu)}>
          <UserProfileCard name={user.name} email={user.email} />
        </div>

        {showMenu && (
          <div className="absolute bottom-20 left-0">
            <UserProfileDropdown />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
