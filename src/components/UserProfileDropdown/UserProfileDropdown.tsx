import { User, Headphones, LogOut } from "lucide-react";

interface UserProfileDropdownProps {
  onProfile?: () => void;
  onSupport?: () => void;
  onLogout?: () => void;
}

const UserProfileDropdown = ({
  onProfile,
  onSupport,
  onLogout,
}: UserProfileDropdownProps) => {
  return (
    <div className="w-[220px] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-lg">
      <button
        onClick={onProfile}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#344054] transition hover:bg-[#F9FAFB]"
      >
        <User size={18} />
        Profile
      </button>

      <button
        onClick={onSupport}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#344054] transition hover:bg-[#F9FAFB]"
      >
        <Headphones size={18} />
        Help and Support
      </button>

      <div className="border-t border-[#EAECF0]" />

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#E53935] transition hover:bg-[#FFF5F5]"
      >
        <LogOut size={18} />
        Log out
      </button>
    </div>
  );
};

export default UserProfileDropdown;
