import UnitRow from "../UnitRow/UnitRow";

const units = [
  {
    unitName: "Unit 1 A",
    property: "Prince & Princess",
    status: "Occupied",
    tenant: "Ndubuisi Eze",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Unit 2 B",
    property: "Sunshine Apartments",
    status: "Active",
    tenant: "Okoro Mgbachi",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Flat 2",
    property: "Peace Estate",
    status: "Occupied",
    tenant: "Emmanuel Arinze",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Block C",
    property: "Hillcrest Apartments",
    status: "Occupied",
    tenant: "Paschal Anorue",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Flat 2",
    property: "Cedar Court",
    status: "Occupied",
    tenant: "Lillian Anayo",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Block A",
    property: "Maple Heights",
    status: "Occupied",
    tenant: "Judith Unanka",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Unit B",
    property: "Emerald Court",
    status: "Occupied",
    tenant: "Kingsley Aham",
    rent: "₦500,000 / y",
  },
  {
    unitName: "Block 4",
    property: "BluCabana",
    status: "Vacant",
    tenant: "",
    rent: "₦500,000 / y",
  },
] as const;

const UnitTable = () => {
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
