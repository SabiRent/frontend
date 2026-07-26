import { Bell } from "lucide-react";

interface NotificationButtonProps {
  onClick?: () => void;
}

const NotificationButton = ({ onClick }: NotificationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white transition hover:bg-gray-50"
    >
      <Bell size={20} />
    </button>
  );
};

export default NotificationButton;
