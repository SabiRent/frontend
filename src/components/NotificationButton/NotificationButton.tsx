import { Bell } from "lucide-react";
import { useNavigate } from "react-router";

import { AppRoutes } from "@/constants/routes";

interface NotificationButtonProps {
  onClick?: () => void;
}

const NotificationButton = ({ onClick }: NotificationButtonProps) => {
  const navigate = useNavigate();

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
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white transition hover:bg-gray-50"
    >
      <Bell size={20} />
    </button>
  );
};

export default NotificationButton;
