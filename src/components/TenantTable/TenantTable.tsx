import TenantRow from "@/components/TenantRow/TenantRow";
import type { Tenant } from "@/services/api/types";

interface TenantTableProps {
  tenants: Tenant[];
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
}

const TenantTable = ({ tenants, onEdit, onDelete }: TenantTableProps) => (
  <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
    <div className="grid min-w-[1180px] grid-cols-[1.35fr_1.6fr_1.5fr_1fr_1fr_1.2fr_0.8fr_50px] border-b border-[#EAECF0] px-5 py-4 text-[15px] font-semibold text-[#031316]">
      <p>Tenant</p>
      <p>Contact</p>
      <p>Property / Unit</p>
      <p>Rent Amount</p>
      <p>Frequency</p>
      <p>Next Due</p>
      <p>Status</p>
      <p />
    </div>
    <div className="min-w-[1180px]">
      {tenants.length > 0 ? (
        tenants.map((tenant) => (
          <TenantRow
            key={tenant.id}
            tenant={tenant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="py-12 text-center text-sm text-[#667085]">
          No tenants found.
        </p>
      )}
    </div>
  </div>
);

export default TenantTable;
