import cedar from "@/assets/images/properties/cedar.png";
import emerald from "@/assets/images/properties/emerald.png";
import hillcrest from "@/assets/images/properties/hillcrest.png";
import maple from "@/assets/images/properties/maple.png";
import peace from "@/assets/images/properties/peace.png";
import sunshine from "@/assets/images/properties/sunshine.png";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

const PropertyGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-7">
      <PropertyCard
        image={sunshine}
        name="Sunshine Apartments"
        type="Apartment Building"
        units={12}
        addressLine1="12 Palm Street"
        addressLine2="Gbagada, Lagos"
      />
      <PropertyCard
        image={peace}
        name="Peace Estate"
        type="Residential Estate"
        units={16}
        addressLine1="23 Unity Road"
        addressLine2="Ikeja, Lagos"
      />
      <PropertyCard
        image={hillcrest}
        name="Hillcrest Apartments"
        type="Apartment Building"
        units={8}
        addressLine1="4 Johnson Avenue"
        addressLine2="Yaba, Lagos"
      />
      <PropertyCard
        image={cedar}
        name="Cedar Heights"
        type="Apartment Building"
        units={10}
        addressLine1="7 Oak Street"
        addressLine2="Lekki, Lagos"
      />

      <PropertyCard
        image={maple}
        name="Maple Apartments"
        type="Apartment Building"
        units={16}
        addressLine1="22 Admiralty Way"
        addressLine2="Lekki Phase 1"
      />
      <PropertyCard
        image={emerald}
        name="Emerald Gardens"
        type="Residential Estate"
        units={20}
        addressLine1="30 Green Valley Drive"
        addressLine2="Ikoyi, Lagos"
      />
      <PropertyCard
        image={cedar}
        name="Cedar Heights"
        type="Apartment Building"
        units={10}
        addressLine1="7 Oak Street"
        addressLine2="Lekki, Lagos"
      />
      <PropertyCard
        image={sunshine}
        name="Sunshine Apartments"
        type="Apartment Building"
        units={12}
        addressLine1="12 Palm Street"
        addressLine2="Gbagada, Lagos"
      />
    </div>
  );
};

export default PropertyGrid;
