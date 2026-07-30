import {
  Bell,
  Boxes,
  Building2,
  CreditCard,
  Home,
  Users,
  X,
} from "lucide-react";

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

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPaymentsMenu, setShowPaymentsMenu] = useState(false);
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

  const navigateAndClose = (route: string) => {
    setShowPaymentsMenu(false);
    navigate(route);
    onClose();
  };

  const navigateToPaymentsView = (view: "summary" | "records") => {
    navigateAndClose(`${AppRoutes.dashboardPayments}?view=${view}`);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] flex-col bg-[#173B67] px-5 py-6 shadow-2xl shadow-slate-950/20 transition-transform duration-300 ease-out md:static md:z-auto md:w-[270px] md:translate-x-0 md:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="mb-10 flex items-center justify-between px-2">
        <img src={logo} alt="MyCompound" className="w-[170px]" />
        <button
          type="button"
          aria-label="Close navigation menu"
          className="inline-flex size-9 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 md:hidden"
          onClick={onClose}
        >
          <X size={21} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
        <SidebarItem
          label="Dashboard"
          icon={<Home size={18} />}
          active={location.pathname === "/dashboard"}
          onClick={() => navigateAndClose(AppRoutes.dashboard)}
        />

        <SidebarItem
          label="Properties"
          icon={<Building2 size={18} />}
          active={location.pathname === AppRoutes.dashboardProperties}
          onClick={() => navigateAndClose(AppRoutes.dashboardProperties)}
        />

        <SidebarItem
          label="Units"
          icon={<Boxes size={18} />}
          active={location.pathname === AppRoutes.dashboardUnits}
          onClick={() => navigateAndClose(AppRoutes.dashboardUnits)}
        />

        <SidebarItem
          label="Tenants"
          icon={<Users size={18} />}
          active={location.pathname === AppRoutes.dashboardTenants}
          onClick={() => navigateAndClose(AppRoutes.dashboardTenants)}
        />

        <div className="relative">
          <SidebarItem
            label="Payments"
            icon={<CreditCard size={18} />}
            active={location.pathname === AppRoutes.dashboardPayments}
            onClick={() => setShowPaymentsMenu((visible) => !visible)}
          />

          {showPaymentsMenu && (
            <div className="absolute left-[170px] top-1 z-20 w-[170px] rounded-xl bg-white p-3 shadow-xl shadow-slate-950/20">
              <button
                type="button"
                className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[#56565E] transition hover:bg-[#F4F7FA] hover:text-[#167589]"
                onClick={() => navigateToPaymentsView("summary")}
              >
                Summary
              </button>
              <button
                type="button"
                className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[#56565E] transition hover:bg-[#F4F7FA] hover:text-[#167589]"
                onClick={() => navigateToPaymentsView("records")}
              >
                Records
              </button>
            </div>
          )}
        </div>

        <SidebarItem
          label="Notifications"
          icon={<Bell size={18} />}
          active={location.pathname === AppRoutes.dashboardNotifications}
          onClick={() => navigateAndClose(AppRoutes.dashboardNotifications)}
        />
      </nav>

      {/* User Profile */}
      <div className="relative mt-auto border-t border-white/10 pt-4">
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer rounded-2xl transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
          onClick={() => setShowMenu(!showMenu)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setShowMenu((visible) => !visible);
            }
          }}
        >
          <UserProfileCard
            name={user?.fullName ?? "User"}
            email={user?.email ?? ""}
            avatar={user?.avatarUrl ?? undefined}
          />
        </div>

        {showMenu && (
          <div className="absolute bottom-[calc(100%+0.75rem)] left-0 z-10 w-full">
            <UserProfileDropdown
              onNavigate={() => {
                setShowMenu(false);
                onClose();
              }}
              onLogout={handleLogoutClick}
            />
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
