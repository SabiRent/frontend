import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import AddUnitModal from "@/components/forms/AddUnitModal";
import AddTenantModal from "@/components/forms/AddTenantModal";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import Pagination from "@/components/Pagination/Pagination";
import UnitsToolbar from "@/components/UnitsToolbar/UnitsToolbar";
import UnitTable from "@/components/UnitTable/UnitTable";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { AppRoutes } from "@/constants/routes";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteUnit } from "@/hooks/useDeleteUnit";
import { useUnits } from "@/hooks/useUnits";
import type { Unit } from "@/services/api/types";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Units = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [assigningTenantUnit, setAssigningTenantUnit] = useState<Unit | null>(
    null,
  );
  const [deletingUnit, setDeletingUnit] = useState<Unit | null>(null);
  const deleteUnit = useDeleteUnit();
  const debouncedSearch = useDebounce(search.trim());
  const { data, isLoading, isError } = useUnits({
    page,
    limit: DEFAULT_LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  });

  const confirmDelete = () => {
    if (!deletingUnit) return;

    deleteUnit.mutate(deletingUnit.id, {
      onSuccess: (response) => {
        toast.success(response.message || "Unit has been deleted.");
        setDeletingUnit(null);
      },
      onError: () => {
        toast.error("We could not delete the unit. Please try again.");
      },
    });
  };

  return (
    <div className="space-y-8">
      <UnitsToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <h2 className="text-[24px] font-semibold text-[#000000]">Total units</h2>

      <div className="-mr-10">
        {isLoading && (
          <div className="flex justify-center py-10">
            <ScaleLoader color="#167589" height={40} width={5} />
          </div>
        )}
        {isError && (
          <p className="py-10 text-center text-sm text-red-600">
            We could not load your units. Please try again.
          </p>
        )}
        {!isLoading && !isError && (
          <UnitTable
            units={data?.units ?? []}
            onEdit={setEditingUnit}
            onDelete={setDeletingUnit}
            onAssignTenant={setAssigningTenantUnit}
          />
        )}
      </div>

      <Pagination
        page={data?.pagination.page ?? page}
        totalPages={data?.pagination.totalPages ?? 1}
        total={data?.pagination.total ?? 0}
        limit={DEFAULT_LIMIT}
        itemLabel="units"
        onPageChange={setPage}
      />

      <AddUnitModal
        open={Boolean(editingUnit)}
        unit={editingUnit}
        onOpenChange={(open) => {
          if (!open) setEditingUnit(null);
        }}
        onSuccess={() => setEditingUnit(null)}
      />

      <AddTenantModal
        open={Boolean(assigningTenantUnit)}
        initialUnit={assigningTenantUnit}
        onOpenChange={(open) => {
          if (!open) setAssigningTenantUnit(null);
        }}
        onSuccess={() => {
          setAssigningTenantUnit(null);
          navigate(AppRoutes.dashboardTenants);
        }}
      />

      <ConfirmDeleteModal
        open={Boolean(deletingUnit)}
        itemName={deletingUnit?.name ?? ""}
        itemLabel="Unit"
        isDeleting={deleteUnit.isPending}
        onOpenChange={(open) => {
          if (!open && !deleteUnit.isPending) setDeletingUnit(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Units;
