import { AlertCircle } from "lucide-react";

import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

interface ConfirmDeleteModalProps {
  open: boolean;
  itemName: string;
  itemLabel?: string;
  isDeleting?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  open,
  itemName,
  itemLabel = "Property",
  isDeleting = false,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      width="480px"
      backgroundColor="#F8FBFC"
      borderRadius="12px"
      className="p-8 sm:p-10"
    >
      <div className="flex flex-col items-center text-center">
        <AlertCircle className="mb-7 h-20 w-20 text-[#E50909]" />

        <h5 className="text-2xl font-bold text-[#031316]">
          Delete {itemLabel}
        </h5>

        <p className="mt-4 text-lg text-[#031316]">
          Are you sure you want to delete
          <br />
          <span className="text-[#E50909]">“{itemName}”</span>?
        </p>

        <div className="mt-7 w-full max-w-88 rounded-xl bg-[#FCE5E5] px-6 py-5 text-lg leading-7 text-[#031316]">
          <p>This action cannot be undone.</p>
          <p>
            All {itemLabel.toLowerCase()} information will be permanently
            removed.
          </p>
        </div>

        <div className="mt-8 flex w-full items-center justify-center gap-12">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className="h-11 w-[118px] rounded-lg border-[#A8AEB2] text-[#031316]"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="h-11 w-[182px] rounded-lg bg-[#E50909] text-white hover:bg-[#C80707]"
          >
            {isDeleting ? "Deleting..." : `Delete ${itemLabel}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
