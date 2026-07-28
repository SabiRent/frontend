import PropertyRow from "../PropertyRow/PropertyRow";
import sunshine from "@/assets/images/properties/sunshine.png";
import peace from "@/assets/images/properties/peace.png";
import hillcrest from "@/assets/images/properties/hillcrest.png";
import cedar from "@/assets/images/properties/cedar.png";
import maple from "@/assets/images/properties/maple.png";
import emerald from "@/assets/images/properties/emerald.png";

const properties = [
  {
    image: sunshine,
    name: "Sunshine Apartments",
    type: "Apartment Building",
    addressLine1: "12 Palm Street",
    addressLine2: "Gbagada, Lagos",
    units: 12,
    occupied: 9,
    vacant: 3,
  },
  {
    image: peace,
    name: "Peace Estate",
    type: "Residential Estate",
    addressLine1: "23 Unity Road",
    addressLine2: "Ikeja, Lagos",
    units: 16,
    occupied: 12,
    vacant: 4,
  },
  {
    image: hillcrest,
    name: "Hillcrest Apartments",
    type: "Apartment Building",
    addressLine1: "4 Johnson Avenue",
    addressLine2: "Yaba, Lagos",
    units: 8,
    occupied: 5,
    vacant: 3,
  },
  {
    image: cedar,
    name: "Cedar Court",
    type: "Apartment Building",
    addressLine1: "7 Green Drive",
    addressLine2: "Lekki, Lagos",
    units: 12,
    occupied: 10,
    vacant: 2,
  },
  {
    image: maple,
    name: "Maple Heights",
    type: "Apartment Building",
    addressLine1: "22 Admiralty Way",
    addressLine2: "Lekki Phase 1",
    units: 16,
    occupied: 14,
    vacant: 2,
  },
  {
    image: emerald,
    name: "Emerald Court",
    type: "Residential Apartment",
    addressLine1: "15 Wuse Zone 4",
    addressLine2: "Abuja",
    units: 8,
    occupied: 6,
    vacant: 2,
  },
];

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
