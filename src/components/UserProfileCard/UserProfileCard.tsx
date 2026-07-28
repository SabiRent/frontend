import { Avatar } from "@/components/Avatar/Avatar";
import { ChevronDown } from "lucide-react";

interface UserProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  onClick?: () => void;
}

const UserProfileCard = ({
  name,
  email,
  avatar,
  onClick,
}: UserProfileCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl bg-white p-3 py-3.5 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Avatar fullname={name} src={avatar} size="sm" />
        {/* {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173B67] text-sm font-semibold text-white">
            {name.charAt(0)}
          </div>
        )} */}

        <div className="text-left">
          <p className="text-sm font-semibold text-[#111827]">{name}</p>

          <p className="text-xs text-[#6B7280]">{email}</p>
        </div>
      </div>

      <ChevronDown size={18} className="text-[#6B7280] shrink-0" />
    </button>
  );
};

export default UserProfileCard;
