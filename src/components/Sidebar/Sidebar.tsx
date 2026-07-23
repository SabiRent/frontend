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

const user = {
  name: "Raymond Agu",
  email: "raymondagu@gmail.com",
};

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  return (
    <aside className="flex h-screen w-[270px] flex-col bg-[#173B67] px-6 py-8">
      {/* Logo */}
      <div className="mb-8 mb-12">
        <img src={logo} alt="MyCompound" className="w-[170px]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <SidebarItem
          icon={<Home size={16} />}
          label="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={() => setActiveItem("Dashboard")}
        />

        <SidebarItem
          icon={<Building2 size={20} />}
          label="Properties"
          active={activeItem === "Properties"}
          onClick={() => setActiveItem("Properties")}
        />

        <SidebarItem
          icon={<Boxes size={20} />}
          label="Units"
          active={activeItem === "Units"}
          onClick={() => setActiveItem("Units")}
        />

        <SidebarItem
          icon={<Users size={20} />}
          label="Tenants"
          active={activeItem === "Tenants"}
          onClick={() => setActiveItem("Tenants")}
        />

        <SidebarItem
          icon={<CreditCard size={20} />}
          label="Payments"
          active={activeItem === "Payments"}
          onClick={() => setActiveItem("Payments")}
        />

        <SidebarItem
          icon={<BarChart3 size={20} />}
          label="Reports"
          active={activeItem === "Reports"}
          onClick={() => setActiveItem("Reports")}
        />

        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          active={activeItem === "Settings"}
          onClick={() => setActiveItem("Settings")}
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
