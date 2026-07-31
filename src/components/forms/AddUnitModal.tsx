import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { useCreateUnit } from "@/hooks/useCreateUnit";
import { useProperties } from "@/hooks/useProperties";
import { useUpdateUnit } from "@/hooks/useUpdateUnit";
import type { Property, Unit } from "@/services/api/types";
import {
  unitFormSchema,
  type UnitFormFields,
  type UnitFormInput,
} from "@/validations/unit";

interface AddUnitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit?: Unit | null;
  initialProperty?: Property | null;
  onSuccess?: (unit: Unit) => void;
}

const AddUnitModal = ({
  open,
  onOpenChange,
  unit = null,
  initialProperty = null,
  onSuccess,
}: AddUnitModalProps) => {
  const createUnit = useCreateUnit();
  const updateUnit = useUpdateUnit();
  const { data: propertyData, isLoading: arePropertiesLoading } = useProperties(
    {
      limit: 100,
    },
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitFormInput, unknown, UnitFormFields>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      property: "",
      name: "",
      occupancyStatus: undefined,
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      property: unit?.property.id ?? initialProperty?.id ?? "",
      name: unit?.name ?? "",
      occupancyStatus: unit?.occupancyStatus,
    });
  }, [open, reset, unit, initialProperty]);

  const closeModal = () => {
    if (isMutationPending) return;
    reset();
    onOpenChange(false);
  };

  const submitForm = async (values: UnitFormFields) => {
    try {
      const savedUnit = unit
        ? await updateUnit.mutateAsync({ id: unit.id, payload: values })
        : await createUnit.mutateAsync(values);

      toast.success(
        unit
          ? "Unit has been updated successfully."
          : "Unit has been added successfully.",
      );
      onOpenChange(false);
      reset();
      onSuccess?.(savedUnit);
    } catch {
      toast.error(
        unit
          ? "We could not update the unit. Please try again."
          : "We could not add the unit. Please try again.",
      );
    }
  };

  const isMutationPending = createUnit.isPending || updateUnit.isPending;

  const propertyOptions = (propertyData?.properties ?? []).map((property) => ({
    label: property.name,
    value: property.id,
  }));

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
        <h5 className="text-[24px] font-medium text-[#102A2E]">
          {unit ? "Edit unit" : "Add unit"}
        </h5>
      }
      borderRadius="12px"
      className="p-8 sm:p-10"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-5 pt-3">
        <Controller
          name="property"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Property name"
              placeholder={
                arePropertiesLoading ? "Loading properties..." : "Name"
              }
              options={propertyOptions}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.property?.message}
              required
              disabled={
                arePropertiesLoading || isMutationPending || Boolean(unit)
              }
            />
          )}
        />

        <TextInput
          label="Unit name / no"
          required
          placeholder="name and number"
          error={errors.name?.message}
          showErrorMessage={false}
          disabled={isMutationPending}
          {...register("name")}
        />

        <Controller
          name="occupancyStatus"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Occupancy status"
              placeholder="Occupied or not"
              options={[
                { label: "Vacant", value: "vacant" },
                { label: "Occupied", value: "occupied" },
              ]}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.occupancyStatus?.message}
              required
              disabled={isMutationPending}
            />
          )}
        />

        <div className="flex items-center justify-center gap-6 pt-10">
          <Button
            type="button"
            variant="outline"
            disabled={isMutationPending}
            onClick={closeModal}
            className="h-11 w-[110px] rounded-lg"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={isMutationPending}
            className="h-11 w-[162px] rounded-lg"
          >
            {unit ? "Update unit" : "Save unit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUnitModal;
