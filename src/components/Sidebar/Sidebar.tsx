import { Bell, Boxes, Building2, CreditCard, Home, Users } from "lucide-react";

import logo from "@/assets/images/logo.png";
import { Button } from "@/components/Button/Button";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";
import UserProfileDropdown from "@/components/UserProfileDropdown/UserProfileDropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppRoutes } from "@/constants/routes";
import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const confirmLogout = () => {
    logout.mutate(undefined, {
      onSuccess: (response) => {
        toast.success(response.message || "You have logged out successfully.");
      },
      onError: () => {
        toast.error("We could not complete the logout. Please try again.");
      },
      onSettled: () => {
        setShowLogoutConfirm(false);
        clearAuth();
        navigate(AppRoutes.login, { replace: true });
      },
    });
  };

  const handleLogoutClick = () => {
    setShowMenu(false);
    setShowLogoutConfirm(true);
  };

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
          <UserProfileCard
            name={user?.fullName ?? "User"}
            email={user?.email ?? ""}
            avatar={user?.avatarUrl ?? undefined}
          />
        </div>

        {showMenu && (
          <div className="absolute bottom-20 left-0">
            <UserProfileDropdown onLogout={handleLogoutClick} />
          </div>
        )}
      </div>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent
          showCloseButton={false}
          className="w-[260px] max-w-[calc(100%-2rem)] rounded-[12px] bg-white p-5 sm:max-w-none"
        >
          <DialogHeader>
            <DialogTitle className="whitespace-nowrap pr-0 text-sm font-normal text-[#111111]">
              Confirm you want to Log out
            </DialogTitle>
          </DialogHeader>

          <div className="flex w-full justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={logout.isPending}
              className="h-8 min-w-[100px] border-[#F59E0B] text-[#167589] hover:bg-[#FFF7E6]"
              onClick={() => setShowLogoutConfirm(false)}
            >
              No
            </Button>
            <Button
              type="button"
              size="sm"
              isLoading={logout.isPending}
              className="h-8 min-w-[100px]"
              onClick={confirmLogout}
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;
