import { Bell } from "lucide-react";
import { useNavigate } from "react-router";

import { AppRoutes } from "@/constants/routes";
import { useUnreadNotificationCount } from "@/hooks/useNotifications";

interface NotificationButtonProps {
  onClick?: () => void;
}

const NotificationButton = ({ onClick }: NotificationButtonProps) => {
  const navigate = useNavigate();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    navigate(AppRoutes.dashboardNotifications);
  };

  return (
    <button
      type="button"
      aria-label="Open notifications"
      onClick={handleClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white transition hover:bg-gray-50"
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#D92D20] px-1.5 text-[11px] font-semibold leading-none text-white ring-2 ring-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
