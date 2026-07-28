import PropertiesToolbar from "@/components/PropertiesToolbar/PropertiesToolbar";
import PropertiesHeader from "@/components/PropertiesHeader/PropertiesHeader";
import PropertyList from "@/components/PropertyList/PropertyList";
import Pagination from "@/components/Pagination/Pagination";

const Properties = () => {
  return (
    <div className="space-y-7 pr-10">
      <PropertiesToolbar />
      <PropertiesHeader />
      <PropertyList />
      <Pagination />
    </div>
  );
};

export default Properties;
