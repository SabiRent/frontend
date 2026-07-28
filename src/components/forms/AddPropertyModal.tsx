import SuccessIcon from "@/assets/icons/success-icon.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { cn } from "@/lib/utils";
import {
  addPropertySchema,
  type AddPropertyFormInput,
  type AddPropertyFormValues,
} from "@/validations/property";

type AddPropertySubmitValues = Omit<AddPropertyFormValues, "image">;

interface AddPropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: AddPropertyFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function AddPropertyModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: AddPropertyModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPropertyFormInput, unknown, AddPropertySubmitValues>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      propertyName: "",
      city: "",
      propertyAddress: "",
      unitCount: undefined,
      description: "",
    },
  });

  const closeModal = () => {
    reset();

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setImage(null);
    setImagePreviewUrl(null);
    onOpenChange(false);
  };

  const submitForm = async (values: AddPropertySubmitValues) => {
    await onSubmit?.({ ...values, image });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] ?? null;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = selectedImage
      ? URL.createObjectURL(selectedImage)
      : null;

    previewUrlRef.current = nextPreviewUrl;
    setImage(selectedImage);
    setImagePreviewUrl(nextPreviewUrl);
  };

  const removeImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setImage(null);
    setImagePreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeModal();
          return;
        }

        onOpenChange(true);
      }}
      title={
        <span className="text-[24px] font-normal text-[#102A2E]">
          Add property
        </span>
      }
      className="max-h-[95vh] overflow-y-auto p-5 sm:px-8 sm:py-5"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <TextInput
          label="Property name"
          required
          placeholder="name"
          error={errors.propertyName?.message}
          showErrorMessage={false}
          {...register("propertyName")}
        />

        <div className="grid grid-cols-[132px_1fr] gap-4">
          <TextInput
            label="City"
            required
            placeholder="12 Gregory road..."
            error={errors.city?.message}
            showErrorMessage={false}
            {...register("city")}
          />

          <TextInput
            label="Property address"
            required
            placeholder="12 Gregory road..."
            error={errors.propertyAddress?.message}
            showErrorMessage={false}
            {...register("propertyAddress")}
          />
        </div>

        <TextInput
          label="Unit count"
          required
          type="number"
          min={1}
          placeholder="6"
          error={errors.unitCount?.message}
          showErrorMessage={false}
          {...register("unitCount", { valueAsNumber: true })}
        />

        <TextInput
          label="Description (Optional)"
          multiline
          rows={2}
          placeholder="Blue and white"
          {...register("description")}
        />

        <div
          className={cn(
            "flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[#C8CED0] text-center",
            imagePreviewUrl && "border-[#0DD97D]",
          )}
        >
          {imagePreviewUrl ? (
            <>
              <div className="mb-1 flex flex-col items-center">
                <SuccessIcon className="h-12 w-12" aria-hidden="true" />
                <div className="relative">
                  <img
                    src={imagePreviewUrl}
                    alt="Selected property"
                    className="h-18 w-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove selected image"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-white shadow-sm transition-colors hover:bg-red-500"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <ImagePlus
              className="mb-2 h-5 w-5 text-[#667085]"
              aria-hidden="true"
            />
          )}

          {!imagePreviewUrl && (
            <p className="mb-3 text-xs text-[#667085]">
              Drop your image here or
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {!imagePreviewUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="border border-[#E2E5E9] bg-white px-8 text-[#667085] hover:bg-slate-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Click to Browse
            </Button>
          )}
        </div>

        <div className="flex justify-center gap-6 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="min-w-[110px]"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="min-w-[162px]  hover:bg-[#156B78]"
          >
            Save property
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddPropertyModal;
