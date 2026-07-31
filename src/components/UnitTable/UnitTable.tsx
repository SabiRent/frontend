import UnitRow from "../UnitRow/UnitRow";
interface Unit {
  unitName: string;
  property: string;
  status: "Occupied" | "Active" | "Vacant";
  tenant: string;
  rent: string;
}

interface UnitTableProps {
  units: Unit[];
}

const UnitTable = ({ units }: UnitTableProps) => {
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
            key={unit.unitName + unit.property}
            unitName={unit.unitName}
            property={unit.property}
            status={unit.status}
            tenant={unit.tenant}
            rent={unit.rent}
          />
        ))}
      </div>
    </div>
  );
};

export default UnitTable;
