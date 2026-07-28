import { List, Grid2X2 } from "lucide-react";

const PropertiesHeader = () => {
  return (
    <div className="flex items-start justify-between pt-6">
      <h2 className="text-[20px] font-semibold text-[#031316]">
        Properties added
      </h2>

      <div className="flex items-center gap-6">
        <button className="text-[#1E869B]">
          <List size={24} />
        </button>

        <button className="text-[#D0D5DD]">
          <Grid2X2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default PropertiesHeader;
