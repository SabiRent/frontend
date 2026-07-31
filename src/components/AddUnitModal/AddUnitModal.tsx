import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Unit {
  unitName: string;
  property: string;
  status: string;
  tenant: string;
  rent: string;
}

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUnit: Unit) => void;
}

const properties = [
  "Prince & Princess",
  "Sunshine Apartments",
  "Peace Estate",
  "Hillcrest Apartments",
  "Cedar Court",
  "Maple Heights",
  "Emerald Court",
  "BluCabana",
];

const occupancyStatuses = ["Occupied", "Vacant", "Active"];

const AddUnitModal = ({ isOpen, onClose, onSave }: AddUnitModalProps) => {
  const [property, setProperty] = useState("");
  const [unitName, setUnitName] = useState("");
  const [occupancyStatus, setOccupancyStatus] = useState("");

  if (!isOpen) return null;

  const isFormValid =
    property !== "" && unitName.trim() !== "" && occupancyStatus !== "";

  const handleSave = () => {
    if (!isFormValid) return;

    onSave({
      unitName,
      property,
      status: occupancyStatus,
      tenant: "",
      rent: "₦0 / y",
    });

    setProperty("");
    setUnitName("");
    setOccupancyStatus("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="relative w-[500px] rounded-lg bg-[#F8FBFC] px-10 py-9 shadow-[0_24px_60px_rgba(16,24,40,0.18)]">
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-7 top-7 flex h-6 w-6 items-center justify-center rounded-full border border-[#667085] hover:bg-red-400"
        >
          <X size={11} strokeWidth={2.2} className="text-[#5A5C5E]" />
        </button>

        {/* Heading */}

        <h2 className="text-[24px] font-medium text-[#031316]">Add Unit</h2>

        <div className="mt-10 space-y-6">
          {/* Property */}

          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#101828]">
              Property name
              <span className="text-[#F04438]">*</span>
            </label>

            <div className="relative">
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="h-[44px] w-full appearance-none rounded-[10px] border border-[#B8E0ED] bg-white px-4 text-[13px] outline-none focus:border-[#167589]"
              >
                <option value="">Select property</option>

                {properties.map((property) => (
                  <option key={property} value={property}>
                    {property}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
              />
            </div>
          </div>

          {/* Unit */}

          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#101828]">
              Unit name / no
              <span className="text-[#F04438]">*</span>
            </label>

            <input
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="Name and number"
              className="h-[44px] w-full rounded-[10px] border border-[#B8E0ED] bg-white px-4 text-[13px] placeholder:text-[#C6C6C6] outline-none focus:border-[#167589]"
            />
          </div>

          {/* Occupancy */}

          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#101828]">
              Occupancy status
              <span className="text-[#F04438]">*</span>
            </label>

            <div className="relative">
              <select
                value={occupancyStatus}
                onChange={(e) => setOccupancyStatus(e.target.value)}
                className="h-[44px] w-full appearance-none rounded-[10px] border border-[#B8E0ED] bg-white px-4 text-[13px] outline-none focus:border-[#167589]"
              >
                <option value="">Occupied or not</option>

                {occupancyStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-12 flex justify-center gap-5">
          <button
            onClick={onClose}
            className="h-[40px] w-[100px] rounded-[8px] border border-[#167589] bg-white text-[14px] font-semibold text-[#167589] hover:bg-[#F5FCFD]"
          >
            Cancel
          </button>

          <button
            disabled={!isFormValid}
            onClick={handleSave}
            className={`h-[40px] w-[145px] rounded-[8px] text-[14px] font-semibold text-white transition ${
              isFormValid
                ? "bg-[#167589] hover:bg-[#126976]"
                : "cursor-not-allowed bg-[#A8ABAB]"
            }`}
          >
            Save Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnitModal;
