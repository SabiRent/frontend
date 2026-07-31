import type { Tenant } from "@/types/tenant";
import TenantsToolbar from "@/components/TenantsToolBar/TenantsToolBar";
import TenantTable from "@/components/TenantTable/TenantTable";
import EditTenantModal from "@/components/forms/EditTenantModal";
import AddTenantModal from "@/components/forms/AddTenantModal";
import { useState } from "react";

const Tenants = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | undefined>(
    undefined,
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <TenantsToolbar
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onAddTenant={() => setIsAddTenantModalOpen(true)}
      />

      {/* Heading */}
      <h2 className="text-[24px] font-semibold text-[#000000]">Tenant list</h2>

      {/* Table */}
      <div className="-mr-10">
        <TenantTable
          selectedStatus={selectedStatus}
          onEdit={(tenant) => {
            setSelectedTenant(tenant);
            setIsEditModalOpen(true);
          }}
        />
      </div>

      <EditTenantModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tenant={selectedTenant}
      />

      <AddTenantModal
        isOpen={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
      />
    </div>
  );
};

export default Tenants;
