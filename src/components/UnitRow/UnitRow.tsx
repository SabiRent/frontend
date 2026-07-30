import { CheckCircle2, MoreVertical } from "lucide-react";
import { useState } from "react";
import type { Unit } from "@/services/api/types";

interface UnitRowProps {
  unit: Unit;
}
const UnitRow = ({ unit }: UnitRowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const isVacant = unit.occupancyStatus === "vacant";
  const status = isVacant ? "Vacant" : "Occupied";
  const rent = new Intl.NumberFormat("en-NG").format(unit.rentAmount);

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

      <p className="text-[15px] font-semibold text-[#031316]">
        ₦{rent} / {unit.rentInterval === "yearly" ? "y" : "m"}
      </p>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] hover:bg-[#F9FAFB]"
        >
          <MoreVertical size={14} className="text-[#667085]" />
        </button>

        {showMenu && (
          <div className="absolute -left-[180px] top-0 z-20 w-[180px] rounded-xl bg-white shadow-[0_12px_24px_rgba(16,24,40,0.12)] ">
            <button className="block w-full px-5 py-3 text-left text-sm hover:bg-[#F9FAFB] font-medium text-[#5A5C5E]">
              Assign Tenant
            </button>

            <button className="block w-full px-5 py-3 text-left text-sm hover:bg-[#F9FAFB] font-medium text-[#5A5C5E]">
              Edit Unit
            </button>

            <button className="block w-full px-5 py-3 text-left text-sm text-[#667085] hover:bg-[#F9FAFB] font-medium text-[#5A5C5E]">
              Delete Unit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitRow;
