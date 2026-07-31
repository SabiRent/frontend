import { X } from "lucide-react";
import { useState } from "react";

const calculateNextDueDate = (
  paymentFrequency: string,
  paymentDate: string,
) => {
  if (!paymentDate || !paymentFrequency) return "";

  const date = new Date(paymentDate);

  switch (paymentFrequency) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;

    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;

    case "Yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;

    default:
      return "";
  }

  return date.toISOString().split("T")[0];
};

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

const frequencies = ["Yearly", "Quarterly", "Monthly"];

const statuses = ["Active", "Inactive", "Pending"];

interface EditTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant?: {
    name?: string;
    phone?: string;
    email?: string;
    rent?: string | number;
    property?: string;
    frequency?: string;
    status?: string;
  };
}

const EditTenantModal = ({ isOpen, onClose }: EditTenantModalProps) => {
  const [frequency, setFrequency] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");

  const handleFrequencyChange = (value: string) => {
    setFrequency(value);
    setNextDueDate(calculateNextDueDate(value, lastPaymentDate));
  };

  const handleLastPaymentChange = (value: string) => {
    setLastPaymentDate(value);
    setNextDueDate(calculateNextDueDate(frequency, value));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="relative max-h-[95vh] w-[460px] overflow-y-auto rounded-lg bg-white px-8 py-10 shadow-[0_24px_60px_rgba(16,24,40,0.18)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-8 top-12 flex h-5 w-5 items-center justify-center rounded-full border border-[#5A5C5E] hover:bg-red-400"
        >
          <X size={12} className="text-[#5A5C5E]" />
        </button>

        {/* Title */}
        <h2 className="mb-5 text-[24px] font-medium text-[#031316]">
          Edit Tenant
        </h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Email <span className="text-[#667085]">(optional)</span>
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]"
            />
          </div>

          {/* Property */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Property
            </label>

            <select className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]">
              <option value="">Select a property</option>

              {properties.map((property) => (
                <option key={property}>{property}</option>
              ))}
            </select>
          </div>

          {/* Rent */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Rent Amount
            </label>

            <input
              type="number"
              placeholder="Enter rent amount"
              className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]"
            />
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Payment Frequency
            </label>

            <select
              onChange={(e) => handleFrequencyChange(e.target.value)}
              className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]"
            >
              <option value="">Select payment frequency</option>

              {frequencies.map((frequency) => (
                <option key={frequency}>{frequency}</option>
              ))}
            </select>
          </div>

          {/* Last Payment Date */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Last Payment Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={lastPaymentDate}
                onChange={(e) => handleLastPaymentChange(e.target.value)}
                className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 pr-11 outline-none focus:border-[#167589]"
              />
            </div>
          </div>

          {/* Next Due Date */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Next Due Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={nextDueDate}
                readOnly
                className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 pr-11 outline-none focus:border-[#167589]"
              />
            </div>
          </div>

          {/* Current Status */}
          <div>
            <label className="mb-1 block text-[14px] font-semibold text-[#031316]">
              Current Status
            </label>

            <select className="h-[40px] w-full rounded-lg border border-[#A8ABAB] px-4 outline-none focus:border-[#167589]">
              <option value="">Select a status</option>

              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-center gap-4 mb-4">
          <button
            onClick={onClose}
            className="h-[44px] w-[170px] rounded-lg border border-[#167589] bg-white text-[#167589] transition hover:bg-[#F5FCFD]"
          >
            Cancel
          </button>

          <button className="h-[44px] w-[170px] rounded-lg bg-[#167589] text-white transition hover:bg-[#126976]">
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTenantModal;
