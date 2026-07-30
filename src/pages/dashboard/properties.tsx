import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import Pagination from "@/components/Pagination/Pagination";
import PropertiesHeader from "@/components/PropertiesHeader/PropertiesHeader";
import PropertiesToolbar from "@/components/PropertiesToolbar/PropertiesToolbar";
import PropertyGrid from "@/components/PropertyGrid/PropertyGrid";
import PropertyList from "@/components/PropertyList/PropertyList";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useDeleteProperty } from "@/hooks/useDeleteProperty";
import { useDebounce } from "@/hooks/useDebounce";
import { useProperties } from "@/hooks/useProperties";
import type { Property } from "@/services/api/types";
import { toast } from "sonner";

const Properties = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(
    null,
  );
  const debouncedSearch = useDebounce(search.trim());
  const deleteProperty = useDeleteProperty();
  const { data, isLoading, isError } = useProperties({
    page,
    limit: DEFAULT_LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  });

  const properties = data?.properties ?? [];

  const handleDelete = (property: Property) => {
    setDeletingProperty(property);
  };

  const confirmDelete = () => {
    if (!deletingProperty) return;

    deleteProperty.mutate(deletingProperty.id, {
      onSuccess: (response) => {
        toast.success(response.message || "Property has been deleted.");
        setDeletingProperty(null);
      },
      onError: () => {
        toast.error("We could not delete the property. Please try again.");
      },
    });
  };

  return (
    <div className="space-y-7">
      <PropertiesToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <PropertiesHeader view={view} setView={setView} />

      {isLoading && (
        <div className="flex justify-center py-10">
          <ScaleLoader color="#167589" height={40} width={5} />
        </div>
      )}

      {isError && (
        <p className="py-10 text-center text-sm text-red-600">
          We could not load your properties. Please try again.
        </p>
      )}

      {!isLoading &&
        !isError &&
        (view === "list" ? (
          <PropertyList
            properties={properties}
            onEdit={setEditingProperty}
            onDelete={handleDelete}
          />
        ) : (
          <PropertyGrid
            properties={properties}
            onEdit={setEditingProperty}
            onDelete={handleDelete}
          />
        ))}

      <Pagination
        page={data?.pagination.page ?? page}
        totalPages={data?.pagination.totalPages ?? 1}
        total={data?.pagination.total ?? 0}
        limit={DEFAULT_LIMIT}
        onPageChange={setPage}
      />

      <AddPropertyModal
        open={Boolean(editingProperty)}
        property={editingProperty}
        onOpenChange={(open) => {
          if (!open) setEditingProperty(null);
        }}
        onSuccess={() => setEditingProperty(null)}
      />

      <ConfirmDeleteModal
        open={Boolean(deletingProperty)}
        propertyName={deletingProperty?.name ?? ""}
        isDeleting={deleteProperty.isPending}
        onOpenChange={(open) => {
          if (!open && !deleteProperty.isPending) {
            setDeletingProperty(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Properties;
