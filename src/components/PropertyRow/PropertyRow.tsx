import { Pencil, Plus, Trash2 } from "lucide-react";

interface PropertyRowProps {
  image: string;
  name: string;
  type: string;
  addressLine1: string;
  addressLine2: string;
  units: number;
  occupied: number;
  vacant: number;
}

const PropertyRow = ({
  image,
  name,
  type,
  addressLine1,
  addressLine2,
  units,
  occupied,
  vacant,
}: PropertyRowProps) => {
  return (
    <div className="grid grid-cols-[1.6fr_1.3fr_.6fr_.6fr_.6fr_.9fr] items-center rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] px-5 py-4 shadow-[0px_2px_8px_rgba(16,24,40,0.06)]">
      {/* Property */}

      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-lg object-cover border border-[#D0D5DD]"
        />

        <div>
          <h3 className="text-[15px] font-bold text-[#000000]">{name}</h3>

          <p className="mt-1 text-xs font-regular text-[#000000]">{type}</p>
        </div>
      </div>

      {/* Address */}

      <div className="text-sm leading-6 text-[#000000] font-medium">
        <p>{addressLine1}</p>
        <p>{addressLine2}</p>
      </div>

      <p className="text-center text-sm font-semibold">{units}</p>

      <p className="text-center text-sm font-semibold">{occupied}</p>

      <p className="text-center text-sm font-semibold">{vacant}</p>

      <div className="flex gap-6">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD]">
          <Pencil size={16} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD]">
          <Trash2 size={16} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD]">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default PropertyRow;
