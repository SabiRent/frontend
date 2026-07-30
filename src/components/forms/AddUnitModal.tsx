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
import type { Unit } from "@/services/api/types";
import {
  unitFormSchema,
  type UnitFormFields,
  type UnitFormInput,
} from "@/validations/unit";

interface AddUnitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (unit: Unit) => void;
}

const AddUnitModal = ({ open, onOpenChange, onSuccess }: AddUnitModalProps) => {
  const createUnit = useCreateUnit();
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
      rentAmount: undefined,
      rentInterval: undefined,
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const closeModal = () => {
    if (createUnit.isPending) return;
    reset();
    onOpenChange(false);
  };

  const submitForm = async (values: UnitFormFields) => {
    try {
      const unit = await createUnit.mutateAsync(values);
      toast.success("Unit has been added successfully.");
      onOpenChange(false);
      reset();
      onSuccess?.(unit);
    } catch {
      toast.error("We could not add the unit. Please try again.");
    }
  };

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
        <span className="text-[24px] font-normal text-[#102A2E]">Add unit</span>
      }
      borderRadius="12px"
      className="p-8 sm:p-10"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
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
              disabled={arePropertiesLoading || createUnit.isPending}
            />
          )}
        />

        <TextInput
          label="Unit name / no"
          required
          placeholder="name and number"
          error={errors.name?.message}
          showErrorMessage={false}
          disabled={createUnit.isPending}
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
              disabled={createUnit.isPending}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Rent amount"
            required
            type="number"
            min={0}
            placeholder="500000"
            error={errors.rentAmount?.message}
            showErrorMessage={false}
            disabled={createUnit.isPending}
            {...register("rentAmount", { valueAsNumber: true })}
          />

          <Controller
            name="rentInterval"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Rent interval"
                placeholder="Select interval"
                options={[
                  { label: "Yearly", value: "yearly" },
                  { label: "Monthly", value: "monthly" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.rentInterval?.message}
                required
                disabled={createUnit.isPending}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-center gap-6 pt-10">
          <Button
            type="button"
            variant="outline"
            disabled={createUnit.isPending}
            onClick={closeModal}
            className="h-11 w-[110px] rounded-lg"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={createUnit.isPending}
            className="h-11 w-[162px] rounded-lg"
          >
            Save property
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUnitModal;
