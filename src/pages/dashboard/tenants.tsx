import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

import AddTenantModal from "@/components/forms/AddTenantModal";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import Pagination from "@/components/Pagination/Pagination";
import TenantTable from "@/components/TenantTable/TenantTable";
import TenantsToolbar from "@/components/TenantsToolBar/TenantsToolBar";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteTenant } from "@/hooks/useDeleteTenant";
import { useTenants } from "@/hooks/useTenants";
import type { Tenant, TenantStatus } from "@/services/api/types";

const Tenants = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TenantStatus>();
  const [page, setPage] = useState(1);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [deletingTenant, setDeletingTenant] = useState<Tenant | null>(null);
  const deleteTenant = useDeleteTenant();
  const debouncedSearch = useDebounce(search.trim());
  const { data, isLoading, isError } = useTenants({
    page,
    limit: DEFAULT_LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(status ? { status } : {}),
  });

  const confirmDelete = () => {
    if (!deletingTenant) return;

    deleteTenant.mutate(deletingTenant.id, {
      onSuccess: (response) => {
        toast.success(response.message || "Tenant has been deleted.");
        setDeletingTenant(null);
      },
      onError: () =>
        toast.error("We could not delete the tenant. Please try again."),
    });
  };

  return (
    <div className="space-y-8">
      <TenantsToolbar
        search={search}
        status={status}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      <h2 className="text-[24px] font-semibold text-[#000000]">Tenant list</h2>

      <div className="-mr-10">
        {isLoading && (
          <div className="flex justify-center py-10">
            <ScaleLoader color="#167589" height={40} width={5} />
          </div>
        )}
        {isError && (
          <p className="py-10 text-center text-sm text-red-600">
            We could not load your tenants. Please try again.
          </p>
        )}
        {!isLoading && !isError && (
          <TenantTable
            tenants={data?.tenants ?? []}
            onEdit={setEditingTenant}
            onDelete={setDeletingTenant}
          />
        )}
      </div>

      <Pagination
        page={data?.pagination.page ?? page}
        totalPages={data?.pagination.totalPages ?? 1}
        total={data?.pagination.total ?? 0}
        limit={DEFAULT_LIMIT}
        itemLabel="tenants"
        onPageChange={setPage}
      />

      <AddTenantModal
        open={Boolean(editingTenant)}
        tenant={editingTenant}
        onOpenChange={(open) => {
          if (!open) setEditingTenant(null);
        }}
        onSuccess={() => setEditingTenant(null)}
      />

      <ConfirmDeleteModal
        open={Boolean(deletingTenant)}
        itemName={deletingTenant?.fullName ?? ""}
        itemLabel="Tenant"
        isDeleting={deleteTenant.isPending}
        onOpenChange={(open) => {
          if (!open && !deleteTenant.isPending) setDeletingTenant(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Tenants;
