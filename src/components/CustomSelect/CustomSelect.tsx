import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: CustomSelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  error,
  required = false,
  disabled = false,
}: CustomSelectProps) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-semibold text-[#1F2937]">
        {label}
        {required && <span className="ml-0.5 text-[#E11D48]">*</span>}
      </label>

      <Select
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue ?? "")}
      >
        <SelectTrigger
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={`h-11! w-full rounded-lg bg-white px-3 text-xs text-[#1F2937] ${
            error ? "border-[#E11D48]" : "border-[#AEB5B7]"
          }`}
        >
          <SelectValue placeholder={placeholder}>
            {selectedOption?.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent align="start">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <p className="text-xs text-[#E11D48]">{error}</p>}
    </div>
  );
};

export default CustomSelect;
