import SuccessIcon from "@/assets/icons/success-icon.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import type { Property } from "@/services/api/types";
import { cn } from "@/lib/utils";
import {
  propertyFormSchema,
  type PropertyFormFields,
  type PropertyFormInput,
} from "@/validations/property";

interface AddPropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property | null;
  onSuccess?: (property: Property) => void;
  isSubmitting?: boolean;
}

const AddPropertyModal = ({
  open,
  onOpenChange,
  property = null,
  onSuccess,
  isSubmitting = false,
}: AddPropertyModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormInput, unknown, PropertyFormFields>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      unitCount: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      name: property?.name ?? "",
      street: property?.address.street ?? "",
      city: property?.address.city ?? "",
      unitCount: property?.unitCount,
      description: property?.description ?? "",
    });
  }, [open, property, reset]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const closeModal = () => {
    reset();

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setImage(null);
    setImagePreviewUrl(null);
    setImageRemoved(false);
    onOpenChange(false);
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
    setImageRemoved(false);
  };

  const removeImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setImage(null);
    setImagePreviewUrl(null);
    setImageRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitForm = async (values: PropertyFormFields) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append(
      "address",
      JSON.stringify({
        street: values.street,
        city: values.city,
      }),
    );
    formData.append("unitCount", String(values.unitCount));

    if (values.description) {
      formData.append("description", values.description);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const savedProperty = property
        ? await updateProperty.mutateAsync({
            id: property.id,
            formData,
          })
        : await createProperty.mutateAsync(formData);

      toast.success(
        property
          ? "Property has been updated successfully."
          : "Property has been added successfully.",
      );
      onOpenChange(false);
      onSuccess?.(savedProperty);
    } catch {
      toast.error(
        property
          ? "We could not update the property. Please try again."
          : "We could not add the property. Please try again.",
      );
    }
  };

  const isMutationPending =
    isSubmitting || createProperty.isPending || updateProperty.isPending;
  const previewImage =
    imagePreviewUrl ?? (!imageRemoved ? (property?.image ?? null) : null);

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
          {property ? "Update property" : "Add property"}
        </span>
      }
      className="max-h-[95vh] overflow-y-auto p-5 sm:px-8 sm:py-5"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <TextInput
          label="Property name"
          required
          placeholder="name"
          error={errors.name?.message}
          showErrorMessage={false}
          {...register("name")}
        />

        <div className="grid grid-cols-[132px_1fr] gap-4">
          <TextInput
            label="City"
            required
            placeholder="Lagos"
            error={errors.city?.message}
            showErrorMessage={false}
            {...register("city")}
          />

          <TextInput
            label="Property address"
            required
            placeholder="12 Gregory road..."
            error={errors.street?.message}
            showErrorMessage={false}
            {...register("street")}
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
            previewImage && "border-[#0DD97D]",
          )}
        >
          {previewImage ? (
            <div className="mb-1 flex flex-col items-center">
              <SuccessIcon className="h-12 w-12" aria-hidden="true" />
              <div className="relative">
                <img
                  src={previewImage}
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
          ) : (
            <ImagePlus
              className="mb-2 h-5 w-5 text-[#667085]"
              aria-hidden="true"
            />
          )}

          {!previewImage && (
            <p className="mb-3 text-xs text-[#667085]">
              Drop your image here or
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />

          {!previewImage && (
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
            size="md"
            isLoading={isMutationPending}
            className="min-w-[162px] hover:bg-[#156B78]"
          >
            {property ? "Update property" : "Save property"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPropertyModal;
