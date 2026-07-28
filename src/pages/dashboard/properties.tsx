import { useState } from "react";

import PropertiesToolbar from "@/components/PropertiesToolbar/PropertiesToolbar";
import PropertiesHeader from "@/components/PropertiesHeader/PropertiesHeader";
import PropertyList from "@/components/PropertyList/PropertyList";
import Pagination from "@/components/Pagination/Pagination";
import PropertyCard from "@/components/PropertyGrid/PropertyGrid";

const Properties = () => {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="space-y-7 pr-10">
      <PropertiesToolbar />

      <PropertiesHeader view={view} setView={setView} />

      {view === "list" ? (
        <PropertyList />
      ) : (
        <PropertyCard image="" name="" type="" units={0} address="" />
      )}

      <Pagination />
    </div>
  );
};

export default Properties;
