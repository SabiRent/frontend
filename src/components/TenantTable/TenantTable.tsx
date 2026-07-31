interface Tenant {
  name: string;
  phone: string;
  email: string;
  property: string;
  unit: string;
  rent: string;
  frequency: string;
  nextDue: string;
  status: string;
}

interface TenantTableProps {
  selectedStatus: string;
  onEdit: (tenant: Tenant) => void;
}
import TenantRow from "@/components/TenantRow/TenantRow";

const tenants: Tenant[] = [
  {
    name: "Ndubuisi Eze",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Prince & Princess",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    status: "Active",
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
    status: "Active",
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
    status: "Pending",
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
    status: "Inactive",
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
    status: "Active",
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
    status: "Pending",
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
    status: "Pending",
  },
  {
    name: "Collins Ndukwe",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Maple Heights",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    status: "Pending",
  },
  {
    name: "Chiamaka Onwubiko",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Maple Heights",
    unit: "Unit 1A",
    rent: "₦500,000",
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    status: "Pending",
  },
];
const TenantTable = ({ selectedStatus, onEdit }: TenantTableProps) => {
  const filteredTenants =
    selectedStatus === "All"
      ? tenants
      : tenants.filter((tenant) => {
          console.log(
            tenant.name,
            tenant.status,
            selectedStatus,
            tenant.status === selectedStatus,
          );
          return tenant.status === selectedStatus;
        });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1300px] rounded-lg bg-white shadow-sm">
        {/* Header */}

        <div className="grid grid-cols-[1.5fr_1.6fr_1.6fr_1fr_.8fr_1fr_.9fr_50px] border-b border-[#EAECF0] px-5 py-4 text-[15px] font-semibold text-[#101828]">
          <p>Tenant</p>
          <p>Contact</p>
          <p>Property / Unit</p>
          <p>Rent Amount</p>
          <p>Frequency</p>
          <p>Next Due</p>
          <p>Status</p>
          <p></p>
        </div>

        {/* Rows */}

        {filteredTenants.map((tenant) => (
          <TenantRow
            key={tenant.name}
            name={tenant.name}
            phone={tenant.phone}
            email={tenant.email}
            property={tenant.property}
            unit={tenant.unit}
            rent={tenant.rent}
            frequency={tenant.frequency}
            nextDue={tenant.nextDue}
            status={tenant.status}
            onEdit={() => onEdit(tenant)}
          />
        ))}
      </div>
    </div>
  );
};

export default TenantTable;
