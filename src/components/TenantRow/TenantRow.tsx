import { CalendarDays, Mail, Phone } from "lucide-react";

interface TenantRowProps {
  name: string;
  phone: string;
  email: string;
  property: string;
  unit: string;
  rent: string;
  frequency: string;
  nextDue: string;
}

const TenantRow = ({
  name,
  phone,
  email,
  property,
  unit,
  rent,
  frequency,
  nextDue,
}: TenantRowProps) => {
  return (
    <div className="grid grid-cols-[1.6fr_1.6fr_1.6fr_1fr_1fr_1fr] items-center border-b border-[#EAECF0] px-5 py-5">
      {/* Tenant */}

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#167589] bg-[#E8F1F3] text-xs">
          EA
        </div>

        <p className="text-[14px] font-semibold text-[#031316]">{name}</p>
      </div>

      {/* Contact */}

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
          <Phone size={13} />
          <span>{phone}</span>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
          <Mail size={13} />
          <span>{email}</span>
        </div>
      </div>

      {/* Property */}

      <div>
        <p className="text-[15px] font-semibold text-[#031316]">{property}</p>

        <p className="text-[13px] text-[#5A5C5E]">{unit}</p>
      </div>

      {/* Rent */}

      <p className="text-[15px] font-semibold text-[#031316]">{rent}</p>

      {/* Frequency */}

      <p className="text-[13px] text-[#5A5C5E]">{frequency}</p>

      {/* Next Due */}

      <div className="flex items-center gap-2 text-[13px] text-[#5A5C5E]">
        <CalendarDays size={13} />
        <span>{nextDue}</span>
      </div>
    </div>
  );
};

export default TenantRow;
