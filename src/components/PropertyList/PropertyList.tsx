import { properties } from "@/data";
import PropertyRow from "../PropertyRow/PropertyRow";

const PropertyList = () => {
  return (
    <div className="w-94% rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] p-6">
      {/* Header */}

      <div className="grid grid-cols-[1.6fr_1.3fr_.6fr_.6fr_.6fr_.9fr] pb-5 text-sm font-semibold text-[#000000]">
        <p>Property</p>
        <p>Address</p>
        <p className="text-center">Units</p>
        <p className="text-center">Occupied</p>
        <p className="text-center">Vacant</p>
        <p>Actions</p>
      </div>

      <div className="mt-2 space-y-3">
        {properties.map((property, index) => (
          <PropertyRow
            key={index}
            image={property.image}
            name={property.name}
            type={property.type}
            addressLine1={property.addressLine1}
            addressLine2={property.addressLine2}
            units={property.units}
            occupied={property.occupied}
            vacant={property.vacant}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
