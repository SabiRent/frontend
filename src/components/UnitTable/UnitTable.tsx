import type { Unit } from "@/services/api/types";
import UnitRow from "../UnitRow/UnitRow";

interface UnitTableProps {
  units: Unit[];
}

const UnitTable = ({ units }: UnitTableProps) => {
  return (
    <div className="rounded-lg bg-white px-4 py-1 shadow-sm">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1.5fr_1.3fr_1.5fr_1.2fr_50px] border-b border-[#EAECF0] py-3 text-[15px] font-semibold text-[#101828]">
        <p>Unit name</p>

        <p>Property</p>

        <p>Occupancy status</p>

        <p>Assigned tenant</p>

        <p>Unit rent rate / m / y</p>

        <p></p>
      </div>

      <div>
        {units.map((unit) => (
          <UnitRow key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default UnitTable;
