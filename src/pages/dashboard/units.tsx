import UnitsToolbar from "@/components/UnitsToolbar/UnitsToolbar";
import UnitTable from "@/components/UnitTable/UnitTable";

const Units = () => {
  return (
    <div className="space-y-8">
      <UnitsToolbar />

      <h2 className="text-[24px] font-semibold text-[#000000]">Total units</h2>

      <div className="-mr-10">
        <UnitTable />
      </div>
    </div>
  );
};

export default Units;
