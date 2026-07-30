interface PropertyCardProps {
  image: string;
  name: string;
  type: string;
  units: number;
  addressLine1: string;
  addressLine2: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
import { Pencil, Plus, Trash2 } from "lucide-react";

import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  name,
  type,
  units,
  addressLine1,
  addressLine2,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative h-[310px] overflow-hidden rounded-[18px] border border-[#2A91A2] shadow-md">
      {/* Background Image */}
      <img src={image} alt="Property" className="h-full w-full object-cover" />

      {/* Glass Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[155px] rounded-t-[24px] border border-white/15 bg-black/40 px-4 pt-2 backdrop-blur-lg">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-Bold text-white">{name}</h3>

            <p className=" text-[13px] text-[#4591A1] mb-3">{type}</p>
          </div>

          <span className="text-[14px] font-Bold text-white">{units}</span>
        </div>

        {/* Address */}
        <p className="mb-4 text-[14px] font-Bold leading-6 text-white">
          {addressLine1}, {addressLine2}
        </p>

        {/* Button */}
        <CustomTooltip content="Add unit">
          <button
            type="button"
            className="flex h-8 items-center rounded-md bg-[#F2F2F2] px-3 text-[11px] font-medium text-[#333333] transition-colors hover:bg-[#F0FAFC] hover:text-[#167589] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167589]/40"
          >
            <Plus size={12} className="text-[#167589]" />
            Tap to Add Tenant
          </button>
        </CustomTooltip>
      </div>

      {/* Edit */}
      <CustomTooltip content="Edit property">
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${name}`}
          className="absolute bottom-1 left-2 flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#555] shadow transition-colors hover:bg-[#F0FAFC] hover:text-[#167589] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167589]/40"
        >
          <Pencil size={16} className="text-[#555]" />
        </button>
      </CustomTooltip>

      {/* Delete */}
      <CustomTooltip content="Delete property">
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${name}`}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#555] shadow transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <Trash2 size={16} className="text-[#555]" />
        </button>
      </CustomTooltip>
    </div>
  );
};

export default PropertyCard;
