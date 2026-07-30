import { Pencil, Plus, Trash2 } from "lucide-react";

import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";

interface PropertyRowProps {
  image: string;
  name: string;
  description?: string;
  addressLine1: string;
  addressLine2: string;
  units: number;
  occupied: number | string;
  vacant: number | string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PropertyRow = ({
  image,
  name,
  description,
  addressLine1,
  addressLine2,
  units,
  occupied,
  vacant,
  onEdit,
  onDelete,
}: PropertyRowProps) => {
  return (
    <div className="grid grid-cols-[1.6fr_1.3fr_.6fr_.6fr_.6fr_.9fr] items-center rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] px-5 py-4 shadow-[0px_2px_8px_rgba(16,24,40,0.06)]">
      {/* Property */}

      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-14 w-14 rounded-lg object-cover border border-[#D0D5DD]"
        />

        <div>
          <h3 className="text-[15px] font-bold text-[#000000]">{name}</h3>
          {description && (
            <p className="text-[13px] text-[#667085]">{description}</p>
          )}
        </div>
      </div>

      {/* Address */}

      <div className="text-sm leading-6 text-[#000000] font-medium">
        <p>{addressLine1}</p>
        <p className="text-gray-800">{addressLine2}</p>
      </div>

      <p className="text-center text-sm font-semibold">{units}</p>

      <p className="text-center text-sm font-semibold">{occupied}</p>

      <p className="text-center text-sm font-semibold">{vacant}</p>

      <div className="flex gap-3 xl:gap-6">
        <CustomTooltip content="Edit property">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#344054] transition-colors hover:border-[#167589] hover:bg-[#F0FAFC] hover:text-[#167589] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167589]/40"
          >
            <Pencil size={16} />
          </button>
        </CustomTooltip>

        <CustomTooltip content="Delete property">
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#344054] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <Trash2 size={16} />
          </button>
        </CustomTooltip>

        <CustomTooltip content="Add unit">
          <button
            type="button"
            aria-label={`Add unit to ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#344054] transition-colors hover:border-[#167589] hover:bg-[#F0FAFC] hover:text-[#167589] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167589]/40"
          >
            <Plus size={16} />
          </button>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default PropertyRow;
