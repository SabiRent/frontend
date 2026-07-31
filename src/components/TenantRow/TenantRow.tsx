import { CalendarDays, Mail, MoreVertical, Phone } from "lucide-react";
import { useState } from "react";

interface TenantRowProps {
  name: string;
  phone: string;
  email: string;
  property: string;
  unit: string;
  rent: string;
  frequency: string;
  nextDue: string;
  status: string;
  onEdit?: () => void;
}

const TenantRow = ({
  name,
  phone,
  email,
  property,
  unit,
  rent,
  frequency,
  nextDue,
  status,
  onEdit,
}: TenantRowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="grid grid-cols-[1.5fr_1.6fr_1.6fr_1fr_.8fr_1fr_.9fr_50px] items-center border-b border-[#EAECF0] px-5 py-5">
      {/* Tenant */}

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#167589] bg-[#E8F1F3] text-xs">
          EA
        </div>

        <p className="text-[14px] font-semibold text-[#031316]">{name}</p>
      </div>

      {/* Contact */}

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
          <Phone size={13} />
          <span>{phone}</span>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
          <Mail size={13} />
          <span>{email}</span>
        </div>
      </div>

      {/* Property */}

      <div>
        <p className="text-[15px] font-semibold text-[#031316]">{property}</p>

        <p className="text-[13px] text-[#5A5C5E]">{unit}</p>
      </div>

      {/* Rent */}

      <p className="text-[15px] font-semibold text-[#031316]">{rent}</p>

      {/* Frequency */}

      <p className="text-[13px] text-[#5A5C5E]">{frequency}</p>

      {/* Next Due */}

      <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
        <CalendarDays size={13} />
        <span>{nextDue}</span>
      </div>

      {/* Status */}

      <div>
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium ${
            status === "Active"
              ? "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
              : status === "Inactive"
                ? "border-[#FDA29B] bg-[#FEF3F2] text-[#B42318]"
                : "border-[#D0D5DD] bg-[#F9FAFB] text-[#667085]"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] hover:bg-[#F9FAFB]"
        >
          <MoreVertical size={14} className="text-[#667085]" />
        </button>

        {showMenu && (
          <div className="absolute -left-[180px] top-0 z-20 w-[180px] rounded-xl bg-white shadow-[0_12px_24px_rgba(16,24,40,0.12)] ">
            <button
              onClick={() => {
                setShowMenu(false);
                onEdit?.();
              }}
              className="block w-full px-5 py-3 text-left text-[16px] font-medium text-[#5A5C5E] hover:bg-[#F9FAFB]"
            >
              Edit Tenant
            </button>

            <button className="block w-full px-5 py-3 text-left text-[16px] text-[#667085] hover:bg-[#F9FAFB] font-medium text-[#5A5C5E]">
              Delete Tenant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantRow;
