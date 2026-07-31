import { useState } from "react";
import type { Unit } from "@/types/unit";

import UnitsToolbar from "@/components/UnitsToolbar/UnitsToolbar";
import UnitTable from "@/components/UnitTable/UnitTable";
import AddUnitModal from "@/components/AddUnitModal/AddUnitModal";

const Units = () => {
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);

  const [units, setUnits] = useState<Unit[]>([
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
  ]);

  return (
    <div className="space-y-8">
      <UnitsToolbar onAddUnit={() => setIsAddUnitModalOpen(true)} />

      <h2 className="text-[24px] font-semibold text-[#000000]">Total units</h2>

      <UnitTable units={units} />

      <AddUnitModal
        isOpen={isAddUnitModalOpen}
        onClose={() => setIsAddUnitModalOpen(false)}
        onSave={(newUnit: Unit) => {
          setUnits((prev) => [...prev, newUnit]);
        }}
      />
    </div>
  );
};

export default Units;
