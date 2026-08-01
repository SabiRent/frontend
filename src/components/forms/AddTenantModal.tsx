import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { useCreateTenant } from "@/hooks/useCreateTenant";
import { useProperties } from "@/hooks/useProperties";
import { usePropertyUnits } from "@/hooks/usePropertyUnits";
import { useUpdateTenant } from "@/hooks/useUpdateTenant";
import { getApiErrorDetails } from "@/services/api/api-error";
import type { Tenant, Unit } from "@/services/api/types";
import {
  tenantFormSchema,
  type TenantFormFields,
  type TenantFormInput,
} from "@/validations/tenant";

interface AddTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant?: Tenant | null;
  initialUnit?: Unit | null;
  onSuccess?: (tenant: Tenant) => void;
}

const frequencyLabels = {
  yearly: "Yearly",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

const today = new Date().toISOString().slice(0, 10);

const getNextDueDate = (lastPaymentDate: string, frequency: string) => {
  if (!lastPaymentDate || !frequency) return "";

  const date = new Date(`${lastPaymentDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  if (frequency === "yearly") date.setFullYear(date.getFullYear() + 1);
  if (frequency === "quarterly") date.setMonth(date.getMonth() + 3);
  if (frequency === "monthly") date.setMonth(date.getMonth() + 1);

  return date.toISOString().slice(0, 10);
};

const AddTenantModal = ({
  open,
  onOpenChange,
  tenant = null,
  initialUnit = null,
  onSuccess,
}: AddTenantModalProps) => {
  const createTenant = useCreateTenant();
  const updateTenant = useUpdateTenant();
  const [propertyId, setPropertyId] = useState("");
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
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<TenantFormInput, unknown, TenantFormFields>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      unit: "",
      fullName: "",
      phone: "",
      email: "",
      rentAmount: undefined,
      paymentFrequency: undefined,
      lastPaymentDate: "",
      status: "active",
    },
  });

  const selectedFrequency = watch("paymentFrequency");
  const selectedLastPaymentDate = watch("lastPaymentDate");
  const { data: unitData, isLoading: areUnitsLoading } =
    usePropertyUnits(propertyId);

  useEffect(() => {
    if (!open) return;

    const assignedUnit = tenant?.unit ?? initialUnit;

    reset({
      unit: assignedUnit?.id ?? "",
      fullName: tenant?.fullName ?? "",
      phone: tenant?.phone ?? "",
      email: tenant?.email ?? "",
      rentAmount: tenant?.rentAmount,
      paymentFrequency: tenant?.paymentFrequency,
      lastPaymentDate: tenant?.lastPaymentDate?.slice(0, 10) ?? "",
      status: tenant?.status ?? "active",
    });
    setPropertyId(assignedUnit?.property.id ?? "");
  }, [open, reset, tenant, initialUnit]);

  const isMutationPending = createTenant.isPending || updateTenant.isPending;
  const propertyOptions = (propertyData?.properties ?? []).map((property) => ({
    label: property.name,
    value: property.id,
  }));
  const unitOptions = (unitData?.units ?? []).map((unit) => ({
    label: unit.name,
    value: unit.id,
  }));
  const nextDueDate = getNextDueDate(
    selectedLastPaymentDate,
    selectedFrequency,
  );

  const closeModal = () => {
    if (isMutationPending) return;
    reset();
    onOpenChange(false);
  };

  const submitForm = async (values: TenantFormFields) => {
    try {
      const payload = {
        ...values,
        email: values.email?.trim() || undefined,
      };
      const savedTenant = tenant
        ? await updateTenant.mutateAsync({ id: tenant.id, payload })
        : await createTenant.mutateAsync(payload);

      toast.success(
        tenant
          ? "Tenant has been updated successfully."
          : "Tenant has been added successfully.",
      );
      onOpenChange(false);
      reset();
      onSuccess?.(savedTenant);
    } catch (error) {
      const { message, fieldErrors } = getApiErrorDetails(error);

      Object.entries(fieldErrors).forEach(([field, fieldMessage]) => {
        setError(field as keyof TenantFormFields, {
          type: "server",
          message: fieldMessage,
        });
      });

      toast.error(
        message ??
          Object.values(fieldErrors)[0] ??
          (tenant
            ? "We could not update the tenant. Please try again."
            : "We could not add the tenant. Please try again."),
      );
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
        <h5 className="text-[24px] font-medium text-[#102A2E]">
          {tenant ? "Edit Tenant" : "Add Tenant"}
        </h5>
      }
      borderRadius="12px"
      width="600px"
      className="max-h-[95vh] overflow-y-auto p-8 sm:p-10"
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-5 pt-3">
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Full Name"
            required
            placeholder="Enter full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <TextInput
            label="Phone Number"
            required
            placeholder="Enter phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <TextInput
          label="Email (optional)"
          type="email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <CustomSelect
            label="Property"
            placeholder={
              arePropertiesLoading ? "Loading properties..." : "Select property"
            }
            options={propertyOptions}
            value={propertyId}
            onValueChange={(value) => {
              setPropertyId(value);
              setValue("unit", "");
            }}
            disabled={arePropertiesLoading || isMutationPending}
          />

          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Unit"
                placeholder={
                  areUnitsLoading ? "Loading units..." : "Select unit"
                }
                options={unitOptions}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.unit?.message}
                required
                disabled={!propertyId || areUnitsLoading || isMutationPending}
              />
            )}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Rent Amount"
            required
            type="number"
            min={0}
            placeholder="Enter rent amount"
            error={errors.rentAmount?.message}
            {...register("rentAmount")}
          />

          <Controller
            name="paymentFrequency"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Payment Frequency"
                placeholder="Select frequency"
                options={Object.entries(frequencyLabels).map(
                  ([value, label]) => ({
                    value,
                    label,
                  }),
                )}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.paymentFrequency?.message}
                required
                disabled={isMutationPending}
              />
            )}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Last Payment Date"
            required
            type="date"
            max={today}
            error={errors.lastPaymentDate?.message}
            {...register("lastPaymentDate")}
          />

          <TextInput
            label="Next Due Date"
            type="date"
            value={nextDueDate}
            readOnly
            className="bg-[#F8FAFC] text-[#667085]"
          />
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Current Status"
              placeholder="Select status"
              options={Object.entries(statusLabels).map(([value, label]) => ({
                value,
                label,
              }))}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.status?.message}
              disabled={isMutationPending}
            />
          )}
        />

        <div className="flex justify-center gap-8 pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isMutationPending}
            onClick={closeModal}
            className="min-w-[150px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isMutationPending}
            className="min-w-[150px]"
          >
            {tenant ? "Save Change" : "Save Change"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTenantModal;
