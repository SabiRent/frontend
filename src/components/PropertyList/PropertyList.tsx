import emptyProperty from "@/assets/images/empty-property.png";
import type { Property } from "@/services/api/types";
import PropertyRow from "../PropertyRow/PropertyRow";

interface PropertyListProps {
  properties: Property[];
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  onAddUnit?: (property: Property) => void;
}

const PropertyList = ({
  properties,
  onEdit,
  onDelete,
  onAddUnit,
}: PropertyListProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] p-4 sm:p-6">
      {/* Header */}

      <div className="grid min-w-[860px] grid-cols-[1.6fr_1.3fr_.6fr_.6fr_.6fr_.9fr] pb-5 text-sm font-semibold text-[#000000]">
        <p>Property</p>
        <p>Address</p>
        <p className="text-center">Units</p>
        <p className="text-center">Occupied</p>
        <p className="text-center">Vacant</p>
        <p>Actions</p>
      </div>

      <div className="mt-2 min-w-[860px] space-y-3">
        {properties.map((property) => (
          <PropertyRow
            key={property.id}
            image={property.image ?? emptyProperty}
            name={property.name}
            description={property.description}
            addressLine1={property.address.street}
            addressLine2={[property.address.city, property.address.state]
              .filter(Boolean)
              .join(", ")}
            units={property.unitCount}
            occupied="—"
            vacant="—"
            onEdit={() => onEdit?.(property)}
            onDelete={() => onDelete?.(property)}
            onAddUnit={() => onAddUnit?.(property)}
          />
        ))}
        {properties.length === 0 && (
          <p className="py-8 text-center text-sm text-[#667085]">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
