import { useState } from "react";

import Pagination from "@/components/Pagination/Pagination";
import PropertiesHeader from "@/components/PropertiesHeader/PropertiesHeader";
import PropertiesToolbar from "@/components/PropertiesToolbar/PropertiesToolbar";
import PropertyGrid from "@/components/PropertyGrid/PropertyGrid";
import PropertyList from "@/components/PropertyList/PropertyList";

const Properties = () => {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="space-y-7 pr-10">
      <PropertiesToolbar />

      <PropertiesHeader view={view} setView={setView} />

      {view === "list" ? <PropertyList /> : <PropertyGrid />}

      <Pagination />
    </div>
  );
};

export default Properties;
