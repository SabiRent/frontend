import type { Unit } from "@/services/api/types";
import UnitRow from "../UnitRow/UnitRow";

interface UnitTableProps {
  units: Unit[];
  onEdit?: (unit: Unit) => void;
  onDelete?: (unit: Unit) => void;
  onAssignTenant?: (unit: Unit) => void;
}

const UnitTable = ({
  units,
  onEdit,
  onDelete,
  onAssignTenant,
}: UnitTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white px-4 py-1 shadow-sm">
      {/* Header */}
      <div className="grid min-w-[820px] grid-cols-[1fr_1.5fr_1.3fr_1.5fr_1.2fr_50px] border-b border-[#EAECF0] py-3 text-[15px] font-semibold text-[#101828]">
        <p>Unit name</p>

        <p>Property</p>

        <p>Occupancy status</p>

        <p>Assigned tenant</p>

        <p>Unit rent rate / m / y</p>

        <p></p>
      </div>

      <div className="min-w-[820px]">
        {units.map((unit) => (
          <UnitRow
            key={unit.id}
            unit={unit}
            onEdit={onEdit}
            onDelete={onDelete}
            onAssignTenant={onAssignTenant}
          />
        ))}
      </div>
    </div>
  );
};

export default UnitTable;
