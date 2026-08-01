import {
  ArrowDownUp,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Mail,
  MoreVertical,
  ReceiptText,
  Phone,
  Search,
  SlidersHorizontal,
  X,
  XCircle,
} from "lucide-react";
import {
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router";

import Modal from "@/components/Modal/Modal";

type PaymentStatus = "Paid" | "Due soon" | "Overdue";
type PaymentView = "tracking" | "history";

interface PaymentRecord {
  id: string;
  tenant: string;
  phone: string;
  email: string;
  property: string;
  unit: string;
  rentAmount: number;
  frequency: "Yearly" | "Monthly";
  nextDue: string;
  paidDate: string;
  paymentNote?: string;
  status: PaymentStatus;
}

interface PaymentFormValues {
  paymentDate: string;
  amountPaid: string;
  note: string;
}

const initialPaymentRecords: PaymentRecord[] = [
  {
    id: "ndubuisi-eze",
    tenant: "Ndubuisi Eze",
    phone: "+234 7050456329",
    email: "raymondagu@gmail.com",
    property: "Prince & Princess",
    unit: "Unit 1A",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Paid",
  },
  {
    id: "okoro-mgbachi",
    tenant: "Okoro Mgbachi",
    phone: "+234 7050456329",
    email: "okoromgb@gmail.com",
    property: "Sunshine Apartments",
    unit: "Unit 2B",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Paid",
  },
  {
    id: "emmanuel-arinze",
    tenant: "Emmanuel Arinze",
    phone: "+234 7050456329",
    email: "arinzeem@gmail.com",
    property: "Peace Estate",
    unit: "Flat 2",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Due soon",
  },
  {
    id: "paschal-anorue",
    tenant: "Paschal Anorue",
    phone: "+234 7050456329",
    email: "paschalaa@gmail.com",
    property: "Hillcrest Apartments",
    unit: "Block C",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Overdue",
  },
  {
    id: "lilian-anayo",
    tenant: "Lilian Anayo",
    phone: "+234 7050456329",
    email: "lillyann@gmail.com",
    property: "Cedar Court",
    unit: "Flat 2",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Paid",
  },
  {
    id: "judith-unanka",
    tenant: "Judith Unanka",
    phone: "+234 7050456329",
    email: "judykay@gmail.com",
    property: "Maple Heights",
    unit: "Block A",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Due soon",
  },
  {
    id: "kingsley-aham",
    tenant: "Kingsley Aham",
    phone: "+234 7050456329",
    email: "kinsoaham@gmail.com",
    property: "Emerald Court",
    unit: "Unit B",
    rentAmount: 500000,
    frequency: "Yearly",
    nextDue: "July 18, 2027",
    paidDate: "July 17, 2026",
    status: "Due soon",
  },
];

const statusFilters = ["All", "Paid", "Due soon", "Overdue"] as const;

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  maximumFractionDigits: 0,
});

const formatCurrency = (amount: number) => `N${currencyFormatter.format(amount)}`;
const formatNaira = (amount: number) => `₦${currencyFormatter.format(amount)}`;

const formatPaymentDate = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "July 17, 2026";
  }

  const isoDate = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const slashDate = trimmedValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const dateParts = isoDate
    ? {
        year: Number(isoDate[1]),
        month: Number(isoDate[2]) - 1,
        day: Number(isoDate[3]),
      }
    : slashDate
      ? {
          year: Number(slashDate[3]),
          month: Number(slashDate[2]) - 1,
          day: Number(slashDate[1]),
        }
      : null;

  if (dateParts) {
    const date = new Date(dateParts.year, dateParts.month, dateParts.day);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  return trimmedValue;
};

const parseCurrencyInput = (value: string, fallback: number) => {
  const amount = Number(value.replace(/[^\d.]/g, ""));

  return Number.isFinite(amount) && amount > 0 ? amount : fallback;
};

const statusStyles = {
  Paid: "border-[#A7F3D0] bg-[#ECFDF3] text-[#079455]",
  "Due soon": "border-[#D0D5DD] bg-[#F5F5F5] text-[#667085]",
  Overdue: "border-[#FDA29B] bg-[#FEF3F2] text-[#B42318]",
} satisfies Record<PaymentStatus, string>;

const statusIcons = {
  Paid: CheckCircle2,
  "Due soon": Clock3,
  Overdue: CircleAlert,
} satisfies Record<PaymentStatus, typeof CheckCircle2>;

const Payments = () => {
  const [paymentRecords, setPaymentRecords] =
    useState<PaymentRecord[]>(initialPaymentRecords);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilters)[number]>("All");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedTenantHistory, setSelectedTenantHistory] =
    useState<PaymentRecord | null>(null);
  const [selectedPaymentRecord, setSelectedPaymentRecord] =
    useState<PaymentRecord | null>(null);
  const [searchParams] = useSearchParams();
  const view: PaymentView =
    searchParams.get("view") === "records" ? "history" : "tracking";

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return paymentRecords
      .filter((record) => {
        const matchesStatus =
          view === "history" ||
          statusFilter === "All" ||
          record.status === statusFilter;
        const searchableText = [
          record.tenant,
          record.email,
          record.phone,
          record.property,
          record.unit,
        ]
          .join(" ")
          .toLowerCase();

        return matchesStatus && searchableText.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const comparison = a.tenant.localeCompare(b.tenant);
        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [paymentRecords, query, sortDirection, statusFilter, view]);

  const markPaymentAsPaid = (
    record: PaymentRecord,
    values: PaymentFormValues,
  ) => {
    const paidRecord = {
      ...record,
      rentAmount: parseCurrencyInput(values.amountPaid, record.rentAmount),
      status: "Paid" as const,
      paidDate: formatPaymentDate(values.paymentDate),
      paymentNote: values.note.trim() || "Paid through transfer",
    };

    setPaymentRecords((currentRecords) =>
      currentRecords.map((item) =>
        item.id === record.id ? paidRecord : item,
      ),
    );
    setSelectedPaymentRecord(null);
    setSelectedTenantHistory(paidRecord);
  };

  const tableRecords = filteredRecords;
  const totalGeneratedRent = paymentRecords.reduce(
    (sum, record) => sum + record.rentAmount,
    0,
  );
  const totalPaid = paymentRecords.filter((record) => record.status === "Paid").length;
  const totalDueSoon = paymentRecords.filter(
    (record) => record.status === "Due soon",
  ).length;
  const totalOverdue = paymentRecords.filter(
    (record) => record.status === "Overdue",
  ).length;

  const summaryCards = [
    {
      label: "Generated Rent",
      value: `${formatCurrency(totalGeneratedRent)}.00`,
      icon: null,
      className: "bg-[#F1F3F6] text-[#173B67]",
    },
    {
      label: "Total Paid",
      value: totalPaid,
      icon: CheckCircle2,
      className: "bg-[#DFF8EA] text-[#17A867]",
    },
    {
      label: "Due soon",
      value: totalDueSoon,
      icon: CircleAlert,
      className: "bg-[#FFF3D6] text-[#A66F00]",
    },
    {
      label: "Overdue",
      value: totalOverdue,
      icon: XCircle,
      className: "bg-[#FFE3E3] text-[#D92D20]",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8">
      {view === "tracking" && (
        <>
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="flex min-h-[108px] items-center gap-4 rounded-lg border border-[#EEF2F5] bg-white p-4 shadow-sm"
                >
                  <span
                    className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${card.className}`}
                  >
                    {Icon ? (
                      <Icon size={23} />
                    ) : (
                      <span className="text-xl font-bold leading-none">₦</span>
                    )}
                  </span>

                  <div>
                    <p className="text-sm text-[#667085]">{card.label}</p>
                    <p className="mt-1 text-2xl font-bold text-[#031316]">
                      {card.value}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <PaymentSearch value={query} onChange={setQuery} />

            <div className="flex flex-wrap gap-3">
              {statusFilters.map((status) => {
                const isActive = statusFilter === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`h-12 min-w-[92px] rounded-lg border px-5 text-sm font-medium transition ${
                      isActive
                        ? "border-[#167589] bg-[#167589] text-white"
                        : "border-[#DDE6EC] bg-white text-[#344054] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      <section className="rounded-2xl border border-[#E5EAF0] bg-white shadow-sm">
        {view === "history" && (
          <div className="flex flex-col gap-4 px-5 pt-5 lg:flex-row lg:items-center lg:justify-between">
            <PaymentSearch value={query} onChange={setQuery} />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#DDE6EC] bg-white px-4 text-sm font-medium text-[#344054] transition hover:bg-[#F8FAFC]"
              >
                <SlidersHorizontal size={17} />
                Filter
              </button>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#DDE6EC] bg-white px-4 text-sm font-medium text-[#344054] transition hover:bg-[#F8FAFC]"
                onClick={() =>
                  setSortDirection((current) =>
                    current === "asc" ? "desc" : "asc",
                  )
                }
              >
                <ArrowDownUp size={17} />
                Sort
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 border-b border-[#EEF2F5] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#031316]">
              {view === "tracking" ? "Payment tracking" : "Payment record"}
            </h1>
          </div>

          {view === "tracking" && <div />}
        </div>

        <div className="overflow-x-auto">
          {view === "tracking" ? (
            <TrackingTable
              records={tableRecords}
              onMarkAsPaid={setSelectedPaymentRecord}
              onViewPaidHistory={setSelectedTenantHistory}
              onViewUnpaidHistory={setSelectedTenantHistory}
            />
          ) : (
            <HistoryTable records={tableRecords} />
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-[#EEF2F5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#667085]">
            Showing {tableRecords.length ? 1 : 0} to {tableRecords.length} of{" "}
            {tableRecords.length} {view === "tracking" ? "tenants" : "payments"}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] opacity-50"
              disabled
            >
              <span className="sr-only">Previous page</span>
              {"<"}
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-lg bg-[#167589] font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] opacity-50"
              disabled
            >
              <span className="sr-only">Next page</span>
              {">"}
            </button>
            <button
              type="button"
              className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm text-[#344054]"
            >
              10 / Page
            </button>
          </div>
        </div>
      </section>

      <PaymentHistoryModal
        record={selectedTenantHistory}
        showMarkAsPaid={Boolean(
          selectedTenantHistory && selectedTenantHistory.status !== "Paid",
        )}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTenantHistory(null);
          }
        }}
        onMarkAsPaid={(record) => {
          setSelectedTenantHistory(null);
          setSelectedPaymentRecord(record);
        }}
      />
      <PaymentRecordModal
        record={selectedPaymentRecord}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPaymentRecord(null);
          }
        }}
        onConfirm={markPaymentAsPaid}
      />
    </div>
  );
};

const TenantCell = ({ record }: { record: PaymentRecord }) => (
  <div className="flex min-w-[245px] items-start gap-3">
    <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#88CFE0] bg-[#EAF6F8] text-xs font-semibold text-[#167589]">
      EA
    </span>
    <div>
      <p className="font-semibold text-[#1F2937]">{record.tenant}</p>
      <p className="mt-2 flex items-center gap-2 text-sm text-[#667085]">
        <Phone size={15} />
        {record.phone}
      </p>
      <p className="mt-1 flex items-center gap-2 text-sm text-[#667085]">
        <Mail size={15} />
        {record.email}
      </p>
    </div>
  </div>
);

const PaymentSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <label className="flex h-12 w-full max-w-[430px] items-center gap-3 rounded-xl border border-[#C7CDD4] bg-white px-4">
    <Search size={20} className="text-[#A3ADB8]" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search tenant"
      className="h-full flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#A3ADB8]"
    />
  </label>
);

const CompactTenantCell = ({ record }: { record: PaymentRecord }) => (
  <div className="flex min-w-[190px] items-center gap-3">
    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[#88CFE0] bg-[#EAF6F8] text-[11px] font-semibold text-[#167589]">
      EA
    </span>
    <p className="font-semibold text-[#1F2937]">{record.tenant}</p>
  </div>
);

const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const Icon = statusIcons[status];

  return (
    <span
      className={`inline-flex min-w-[110px] items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium ${statusStyles[status]}`}
    >
      <Icon size={16} />
      {status}
    </span>
  );
};

const TrackingTable = ({
  records,
  onMarkAsPaid,
  onViewPaidHistory,
  onViewUnpaidHistory,
}: {
  records: PaymentRecord[];
  onMarkAsPaid: (record: PaymentRecord) => void;
  onViewPaidHistory: (record: PaymentRecord) => void;
  onViewUnpaidHistory: (record: PaymentRecord) => void;
}) => (
  <table className="w-full min-w-[1040px] border-collapse">
    <thead>
      <tr className="border-b border-[#E5EAF0] text-left text-sm font-semibold text-[#1F2937]">
        <th className="px-5 py-5">Tenant</th>
        <th className="px-5 py-5">Property / Unit</th>
        <th className="px-5 py-5">Rent Amount</th>
        <th className="px-5 py-5">Frequency</th>
        <th className="px-5 py-5">Next Due</th>
        <th className="px-5 py-5">Status</th>
        <th className="min-w-[170px] px-5 py-5" />
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record.id} className="border-b border-[#EEF2F5] last:border-0">
          <td className="px-5 py-5">
            <CompactTenantCell record={record} />
          </td>
          <td className="px-5 py-5">
            <p className="font-semibold text-[#1F2937]">{record.property}</p>
            <p className="mt-1 text-sm text-[#667085]">{record.unit}</p>
          </td>
          <td className="px-5 py-5 font-semibold text-[#1F2937]">
            {formatCurrency(record.rentAmount)}
          </td>
          <td className="px-5 py-5 text-sm text-[#667085]">
            {record.frequency}
          </td>
          <td className="px-5 py-5 text-sm text-[#667085]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} />
              {record.nextDue}
            </span>
          </td>
          <td className="px-5 py-5">
            <StatusBadge status={record.status} />
          </td>
          <td className="px-5 py-5">
            <div className="flex items-center justify-end gap-5">
              {record.status !== "Paid" && (
                <button
                  type="button"
                  className="inline-flex min-h-10 w-[72px] items-center justify-center rounded-lg bg-[#167589] px-3 py-2 text-center text-sm font-semibold leading-tight text-white transition hover:bg-[#126779]"
                  onClick={() => onMarkAsPaid(record)}
                >
                  Mark as Paid
                </button>
              )}

              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085] transition hover:bg-[#F8FAFC]"
                aria-label={`View payment history for ${record.tenant}`}
                onClick={() =>
                  record.status === "Paid"
                    ? onViewPaidHistory(record)
                    : onViewUnpaidHistory(record)
                }
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const HistoryTable = ({ records }: { records: PaymentRecord[] }) => (
  <table className="w-full min-w-[1040px] border-collapse">
    <thead>
      <tr className="border-b border-[#E5EAF0] text-left text-sm font-semibold text-[#1F2937]">
        <th className="px-5 py-5">Tenant</th>
        <th className="px-5 py-5">Date</th>
        <th className="px-5 py-5">Property / Unit</th>
        <th className="px-5 py-5">Amount</th>
        <th className="px-5 py-5">Total Rent</th>
        <th className="px-5 py-5">Next Date</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr
          key={record.id}
          className="border-b border-[#EEF2F5] last:border-0"
        >
          <td className="px-5 py-5">
            <TenantCell record={record} />
          </td>
          <td className="px-5 py-5 text-sm text-[#667085]">
            {record.paidDate}
          </td>
          <td className="px-5 py-5">
            <p className="font-semibold text-[#1F2937]">{record.property}</p>
            <p className="mt-1 text-sm text-[#667085]">{record.unit}</p>
          </td>
          <td className="px-5 py-5 font-semibold text-[#1F2937]">
            {formatCurrency(record.rentAmount)}
          </td>
          <td className="px-5 py-5 text-sm text-[#667085]">
            {formatCurrency(record.rentAmount)}
          </td>
          <td className="px-5 py-5 text-sm text-[#667085]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} />
              {record.nextDue}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PaymentHistoryModal = ({
  record,
  showMarkAsPaid = false,
  onOpenChange,
  onMarkAsPaid,
}: {
  record: PaymentRecord | null;
  showMarkAsPaid?: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsPaid?: (record: PaymentRecord) => void;
}) => {
  const paymentLogs = record
    ? Array.from({ length: showMarkAsPaid ? 2 : 3 }, (_, index) => {
        const defaultMethods = [
          record.paymentNote || "Paid through transfer",
          "Paid cash",
          "Paid through transfer",
        ];

        return {
          id: `${record.id}-${index}`,
          paidDate: index === 0 ? record.paidDate : "July 17, 2026",
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: showMarkAsPaid
            ? "Paid through transfer"
            : defaultMethods[index],
          latest: !showMarkAsPaid && index === 0,
        };
      })
    : [];

  return (
    <Modal
      open={Boolean(record)}
      onOpenChange={onOpenChange}
      width="760px"
      hideCloseButton
      className="max-h-[calc(100vh-3rem)] overflow-y-auto p-8 sm:p-10"
    >
      {record && (
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-xl font-medium text-[#1F2937]">
                <ReceiptText size={21} className="text-[#17A867]" />
                Payment history
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#031316]">
                {record.tenant}
              </h2>
              <p className="mt-2 text-base text-[#667085]">
                {record.property} - {record.unit} - {record.frequency}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close payment history"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#667085] text-[#667085] transition hover:bg-[#F8FAFC]"
              onClick={() => onOpenChange(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-9 border-t border-[#DDE3EA] pt-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <HistoryMetric
                label="Payment count"
                value={record.status === "Paid" ? 4 : 2}
              />
              <HistoryMetric
                label="All payment"
                value={formatNaira(
                  record.status === "Paid" ? 1000000 : 700000,
                )}
              />
              <HistoryMetric label="Next date" value={record.nextDue} />
            </div>
          </div>

          {showMarkAsPaid && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className="h-16 w-full max-w-[690px] rounded-xl bg-[#167589] text-2xl font-semibold text-white transition hover:bg-[#126779]"
                onClick={() => onMarkAsPaid?.(record)}
              >
                Mark as Paid
              </button>
            </div>
          )}

          <section className={showMarkAsPaid ? "mt-12" : "mt-10"}>
            <h3 className="text-xl font-semibold text-[#031316]">
              Payment Log
            </h3>

            <div className="relative mt-8 space-y-7 pl-20">
              <span className="absolute bottom-0 left-[24px] top-0 w-[3px] rounded-full bg-[#17A867]" />

              {paymentLogs.map((item) => (
                <article key={item.id} className="relative">
                  <span className="absolute -left-[65px] top-9 z-10 size-6 rounded-full border-[5px] border-[#173B67] bg-white" />

                  <div
                    className={`rounded-2xl bg-white px-7 py-6 shadow-sm ${
                      item.latest
                        ? "border border-[#EEF2F5]"
                        : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base text-[#667085]">
                          {item.paidDate}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#031316]">
                          {formatNaira(item.amount)}
                        </p>
                      </div>

                      {item.latest && (
                        <span className="inline-flex items-center gap-2 rounded-lg border border-[#75E0A7] bg-[#ECFDF3] px-5 py-2 text-base font-medium text-[#079455]">
                          <CheckCircle2 size={16} />
                          Latest
                        </span>
                      )}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-5">
                      <div>
                        <p className="text-base text-[#667085]">
                          Previous date
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-[#031316]">
                          {item.previousDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-[#667085]">Next date</p>
                        <p className="mt-2 text-2xl font-semibold text-[#031316]">
                          {item.nextDate}
                        </p>
                      </div>
                    </div>

                    <p className="mt-7 flex items-center gap-3 border-t border-[#DDE3EA] pt-5 text-lg text-[#667085]">
                      <ReceiptText size={18} />
                      {item.method}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </Modal>
  );
};

const PaymentRecordModal = ({
  record,
  onOpenChange,
  onConfirm,
}: {
  record: PaymentRecord | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (record: PaymentRecord, values: PaymentFormValues) => void;
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!record) return;

    const formData = new FormData(event.currentTarget);

    onConfirm(record, {
      paymentDate: String(formData.get("paymentDate") ?? ""),
      amountPaid: String(formData.get("amountPaid") ?? ""),
      note: String(formData.get("note") ?? ""),
    });
  };

  return (
    <Modal
      open={Boolean(record)}
      onOpenChange={onOpenChange}
      width="620px"
      hideCloseButton
      className="p-0"
    >
      {record && (
        <form
          className="overflow-hidden rounded-2xl bg-white"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start justify-between gap-4 px-9 py-8">
            <div>
              <p className="flex items-center gap-4 text-2xl font-medium text-[#031316]">
                <ReceiptText size={24} className="text-[#17A867]" />
                Payment Record
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-[#031316]">
                {record.tenant}
              </h2>
              <p className="mt-3 text-2xl text-[#667085]">
                {record.property} Estate - {record.unit}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close payment record"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-[#667085] text-[#667085] transition hover:bg-[#F8FAFC]"
              onClick={() => onOpenChange(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="border-y border-[#DDE3EA] px-9 py-7">
            <div className="space-y-5">
              <PaymentFormField
                label="Date of payment"
                name="paymentDate"
                placeholder="dd/mm/yyyy"
                icon={<CalendarDays size={25} />}
                required
              />
              <PaymentFormField
                label="Amount paid"
                name="amountPaid"
                placeholder="#500,000"
                required
              />
              <PaymentFormField
                label="Full rent"
                name="fullRent"
                placeholder="#500,000"
                required
              />
              <PaymentFormField
                label="Note (optional)"
                name="note"
                placeholder="Bank deposit etc"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-5 px-9 py-9 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="h-16 min-w-[170px] rounded-xl border-2 border-[#167589] px-7 text-2xl font-semibold text-[#167589] transition hover:bg-[#EAF6F8]"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-16 min-w-[285px] rounded-xl bg-[#167589] px-8 text-2xl font-semibold text-white transition hover:bg-[#126779]"
            >
              Confirm payment
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

const PaymentFormField = ({
  label,
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
}) => (
  <label className="block">
    <span className="text-2xl font-medium text-[#031316]">{label}</span>
    <span className="mt-4 flex h-16 items-center gap-5 rounded-xl border-2 border-[#AEB4B7] px-7 text-[#7B8386]">
      {icon}
      <input
        className="h-full min-w-0 flex-1 bg-transparent text-xl text-[#031316] outline-none placeholder:text-[#C4C8CA]"
        {...props}
      />
    </span>
  </label>
);

const HistoryMetric = ({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string | number;
  compact?: boolean;
}) => (
  <div
    className={`rounded-xl border border-[#EEF2F5] bg-white px-5 text-center shadow-sm ${
      compact ? "py-5" : "py-6"
    }`}
  >
    <p className={compact ? "text-base text-[#667085]" : "text-xl text-[#667085]"}>
      {label}
    </p>
    <p
      className={
        compact
          ? "mt-4 text-xl font-semibold text-[#031316]"
          : "mt-5 text-2xl font-semibold text-[#031316]"
      }
    >
      {value}
    </p>
  </div>
);

export default Payments;
