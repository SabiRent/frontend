interface PropertiesHeaderProps {
  view: "list" | "grid";
  setView: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}
import { List, Grid2X2 } from "lucide-react";

const PropertiesHeader = ({ view, setView }: PropertiesHeaderProps) => {
  return (
    <div className="flex items-start justify-between pt-6">
      <h2 className="text-[20px] font-semibold text-[#031316]">
        Properties added
      </h2>

      <div className="flex items-center gap-6">
        <List
          size={20}
          className={`cursor-pointer ${
            view === "list" ? "text-[#167589]" : "text-[#98A2B3]"
          }`}
          onClick={() => setView("list")}
        />

        <Grid2X2
          size={20}
          className={`cursor-pointer ${
            view === "grid" ? "text-[#167589]" : "text-[#98A2B3]"
          }`}
          onClick={() => setView("grid")}
        />
      </div>
    </div>
  );
};

export default PropertiesHeader;
