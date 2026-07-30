import TenantRow from "@/components/TenantRow/TenantRow";

const tenants = [
  {
    name: "Ndubuisi Eze",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Prince & Princess",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Okoro Mgbachi",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Sunshine Apartment",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Emmanuel Arinze",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Peace Estate",
    unit: "Flat 2",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Paschal Anorue",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Hillcrest Apartments",
    unit: "Block C",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Lillian Anayo",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Cedar Court",
    unit: "Flat 2",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Judith Unanka",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Maple Heights",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Kingsley Aham",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Maple Heights",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
  {
    name: "Chinonso Eze",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Maple Heights",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
  },
];

const TenantTable = () => {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* Header */}

      <div className="grid grid-cols-[1.6fr_1.6fr_1.6fr_1fr_1fr_1fr] border-b border-[#EAECF0] px-5 py-4 text-[15px] font-semibold text-[#031316]">
        <p>Tenant</p>

        <p>Contact</p>

        <p>Property / Unit</p>

        <p>Rent Amount</p>

        <p>Frequency</p>

        <p>Next Due</p>
      </div>

      {/* Rows */}

      {tenants.map((tenant) => (
        <TenantRow key={tenant.name} {...tenant} />
      ))}
    </div>
  );
};

export default TenantTable;
