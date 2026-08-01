import { CalendarDays, Mail, MoreVertical, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button/Button";
import type { Tenant } from "@/services/api/types";

interface TenantRowProps {
  tenant: Tenant;
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const TenantRow = ({ tenant, onEdit, onDelete }: TenantRowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!actionsRef.current?.contains(event.target as Node))
        setShowMenu(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu]);

  const statusLabel = tenant.status[0].toUpperCase() + tenant.status.slice(1);
  const statusClass = {
    active: "bg-[#ECFDF3] text-[#067647]",
    inactive: "bg-[#F2F4F7] text-[#667085]",
    pending: "bg-[#FFF4E5] text-[#B54708]",
  }[tenant.status];

  return (
    <div className="grid min-w-[1180px] grid-cols-[1.35fr_1.6fr_1.5fr_1fr_1fr_1.2fr_0.8fr_50px] items-center border-b border-[#F2F4F7] px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#167589] bg-[#E8F1F3] text-xs">
          {tenant.fullName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <p className="text-[14px] font-semibold text-[#031316]">
          {tenant.fullName}
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
          <Phone size={13} />
          <span>{tenant.phone}</span>
        </div>
        {tenant.email && (
          <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
            <Mail size={13} />
            <span>{tenant.email}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-[15px] font-semibold text-[#031316]">
          {tenant.unit.property.name}
        </p>
        <p className="text-[13px] text-[#5A5C5E]">{tenant.unit.name}</p>
      </div>

      <p className="text-[15px] font-semibold text-[#031316]">
        ₦{new Intl.NumberFormat("en-NG").format(tenant.rentAmount)}
      </p>
      <p className="text-[13px] capitalize text-[#5A5C5E]">
        {tenant.paymentFrequency}
      </p>
      <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
        <CalendarDays size={13} />
        <span>{formatDate(tenant.nextDueDate)}</span>
      </div>
      <span
        className={`w-fit rounded-md px-2.5 py-1 text-xs font-medium ${statusClass}`}
      >
        {statusLabel}
      </span>

      <div ref={actionsRef} className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowMenu((current) => !current)}
          aria-label={`Actions for ${tenant.fullName}`}
          className="shrink-0 rounded-lg border-[#D0D5DD] p-0 hover:bg-[#F9FAFB]"
        >
          <MoreVertical size={14} className="text-[#667085]" />
        </Button>

        {showMenu && (
          <div className="absolute -left-[150px] bottom-0 z-20 w-[150px] rounded-xl bg-white shadow-[0_12px_24px_rgba(16,24,40,0.12)]">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowMenu(false);
                onEdit?.(tenant);
              }}
              className="block h-auto w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-[#5A5C5E] hover:bg-[#F9FAFB]"
            >
              Edit Tenant
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowMenu(false);
                onDelete?.(tenant);
              }}
              className="block h-auto w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2]"
            >
              Delete Tenant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantRow;
