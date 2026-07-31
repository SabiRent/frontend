import emptyProperty from "@/assets/images/empty-property.png";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import type { Property } from "@/services/api/types";

interface PropertyGridProps {
  properties: Property[];
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  onAddUnit?: (property: Property) => void;
}

const PropertyGrid = ({
  properties,
  onEdit,
  onDelete,
  onAddUnit,
}: PropertyGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-7">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          image={property.image ?? emptyProperty}
          name={property.name}
          type="Property"
          units={property.unitCount}
          addressLine1={property.address.street}
          addressLine2={[property.address.city, property.address.state]
            .filter(Boolean)
            .join(", ")}
          onEdit={() => onEdit?.(property)}
          onDelete={() => onDelete?.(property)}
          onAddUnit={() => onAddUnit?.(property)}
        />
      ))}
      {properties.length === 0 && (
        <p className="col-span-full py-8 text-center text-sm text-[#667085]">
          No properties found.
        </p>
      )}
    </div>
  );
};

export default PropertyGrid;
