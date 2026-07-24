import {
  Home,
  Building2,
  Boxes,
  Users,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

import SidebarItem from "@/components/SidebarItem/SidebarItem";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";
import { useState } from "react";
import UserProfileDropdown from "@/components/UserProfileDropdown/UserProfileDropdown";
import logo from "@/assets/images/logo.png";
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
      <nav className="flex flex-col gap-3">
        <SidebarItem
          label="Dashboard"
          icon={<Home size={18} />}
          active={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />

        <SidebarItem
          label="Properties"
          icon={<Building2 size={18} />}
          active={location.pathname === "/properties"}
          onClick={() => navigate("/dashboard/properties")}
        />

        <SidebarItem
          label="Units"
          icon={<Boxes size={18} />}
          active={location.pathname === "/units"}
          onClick={() => navigate("/dashboard/units")}
        />

        <SidebarItem
          label="Tenants"
          icon={<Users size={18} />}
          active={location.pathname === "/tenants"}
          onClick={() => navigate("/dashboard/tenants")}
        />

        <SidebarItem
          label="Payments"
          icon={<CreditCard size={18} />}
          active={location.pathname === "/payments"}
          onClick={() => navigate("/dashboard/payments")}
        />

        <SidebarItem
          label="Reports"
          icon={<BarChart3 size={18} />}
          active={location.pathname === "/reports"}
          onClick={() => navigate("/dashboard/reports")}
        />

        <SidebarItem
          label="Settings"
          icon={<Settings size={18} />}
          active={location.pathname === "/settings"}
          onClick={() => navigate("/dashboard/settings")}
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
