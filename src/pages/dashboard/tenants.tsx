import TenantsToolbar from "@/components/TenantsToolBar/TenantsToolBar";
import TenantTable from "@/components/TenantTable/TenantTable";

const Tenants = () => {
  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <TenantsToolbar />

      {/* Heading */}
      <h2 className="text-[24px] font-semibold text-[#000000]">Tenant list</h2>

      {/* Table */}
      <div className="-mr-10">
        <TenantTable />
      </div>
    </div>
  );
};

export default Tenants;
