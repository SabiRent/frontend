import { CheckCircle2, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button/Button";
import type { Unit } from "@/services/api/types";

interface UnitRowProps {
  unit: Unit;
  onEdit?: (unit: Unit) => void;
  onDelete?: (unit: Unit) => void;
}
const UnitRow = ({ unit, onEdit, onDelete }: UnitRowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const isVacant = unit.occupancyStatus === "vacant";
  const status = isVacant ? "Vacant" : "Occupied";
  const hasRent =
    Number.isFinite(unit.rentAmount) && Boolean(unit.rentInterval);
  const rent = hasRent
    ? `₦${new Intl.NumberFormat("en-NG").format(unit.rentAmount)} / ${unit.rentInterval === "yearly" ? "y" : "m"}`
    : "—";

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu]);

  return (
    <div className="grid grid-cols-[1fr_1.5fr_1.3fr_1.5fr_1.2fr_50px] items-center border-b border-[#F2F4F7] py-5">
      <p className="text-[15px] font-semibold text-[#031316]">{unit.name}</p>

      <p className="text-[15px] font-semibold text-[#031316]">
        {unit.property.name}
      </p>

      <div>
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-[3px] text-xs font-medium ${
            isVacant
              ? "border border-[#D0D5DD] bg-[#F2F4F7] text-[#667085]"
              : "border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
          }`}
        >
          {!isVacant && <CheckCircle2 size={10} />}
          {status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#167589] bg-[#E8F1F3] text-xs">
          EA
        </div>

        <p className="text-[15px] text-[#667085] font-semibold">Not assigned</p>
      </div>

      <p className="text-[15px] font-semibold text-[#031316]">{rent}</p>

      <div ref={actionsRef} className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowMenu(!showMenu)}
          aria-label={`Actions for ${unit.name}`}
          className=" rounded-lg border-[#D0D5DD] p-0 hover:bg-[#F9FAFB] shrink-0"
        >
          <MoreVertical size={14} className="text-[#667085]" />
        </Button>

        {showMenu && (
          <div className="absolute -left-[180px] top-0 z-20 w-[180px] rounded-xl bg-white shadow-[0_12px_24px_rgba(16,24,40,0.12)] ">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowMenu(false)}
              className="block h-auto w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-[#5A5C5E] hover:bg-[#F9FAFB]"
            >
              Assign Tenant
            </Button>

            <Button
              type="button"
              onClick={() => {
                setShowMenu(false);
                onEdit?.(unit);
              }}
              variant="ghost"
              className="block h-auto w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-[#5A5C5E] hover:bg-[#F9FAFB]"
            >
              Edit Unit
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowMenu(false);
                onDelete?.(unit);
              }}
              className="block h-auto w-full justify-start rounded-none px-5 py-3 text-left text-sm font-medium text-[#5A5C5E] hover:bg-[#F9FAFB]"
            >
              Delete Unit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitRow;
