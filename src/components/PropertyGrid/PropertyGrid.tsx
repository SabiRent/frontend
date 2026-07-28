import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { properties } from "@/data";
import React from "react";

const PropertyGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-7">
      {properties.map((property, idx) => (
        <React.Fragment key={idx}>
          <PropertyCard
            image={property.image}
            name={property.name}
            type={property.type}
            units={property.units}
            addressLine1={property.addressLine1}
            addressLine2={property.addressLine2}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default PropertyGrid;
