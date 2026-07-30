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
import { useMemo, useState } from "react";
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
  status: PaymentStatus;
}

const paymentRecords: PaymentRecord[] = [
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
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilters)[number]>("All");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedTenantHistory, setSelectedTenantHistory] =
    useState<PaymentRecord | null>(null);
  const [selectedPaymentHistory, setSelectedPaymentHistory] =
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
  }, [query, sortDirection, statusFilter, view]);

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
              {view === "tracking" ? "Tenant record" : "Payment record"}
            </h1>
            {view === "tracking" && (
              <p className="mt-2 text-sm text-[#667085]">
                Track tenant rent status and upcoming due dates.
              </p>
            )}
          </div>

          {view === "tracking" && <div />}
        </div>

        <div className="overflow-x-auto">
          {view === "tracking" ? (
            <TrackingTable
              records={tableRecords}
              onViewHistory={setSelectedTenantHistory}
            />
          ) : (
            <HistoryTable
              records={tableRecords}
              onViewHistory={setSelectedPaymentHistory}
            />
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
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTenantHistory(null);
          }
        }}
      />
      <PaymentRecordHistoryModal
        record={selectedPaymentHistory}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPaymentHistory(null);
          }
        }}
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
  onViewHistory,
}: {
  records: PaymentRecord[];
  onViewHistory: (record: PaymentRecord) => void;
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
        <th className="px-5 py-5" />
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
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085] transition hover:bg-[#F8FAFC]"
              aria-label={`View payment history for ${record.tenant}`}
              onClick={() => onViewHistory(record)}
            >
              <MoreVertical size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const HistoryTable = ({
  records,
  onViewHistory,
}: {
  records: PaymentRecord[];
  onViewHistory: (record: PaymentRecord) => void;
}) => (
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
          className="cursor-pointer border-b border-[#EEF2F5] transition hover:bg-[#F8FAFC] last:border-0"
          onClick={() => onViewHistory(record)}
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
  onOpenChange,
}: {
  record: PaymentRecord | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const paymentLogs = record
    ? [
        {
          id: `${record.id}-latest`,
          paidDate: record.paidDate,
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: "Paid through transfer",
          latest: true,
        },
        {
          id: `${record.id}-previous`,
          paidDate: record.paidDate,
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: "Paid cash",
          latest: false,
        },
        {
          id: `${record.id}-older`,
          paidDate: record.paidDate,
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: "Paid through transfer",
          latest: false,
        },
      ]
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
              <HistoryMetric label="Payment count" value={4} />
              <HistoryMetric
                label="All payment"
                value={formatNaira(
                  record.tenant === "Okoro Mgbachi" ? 700000 : 1000000,
                )}
              />
              <HistoryMetric label="Next date" value={record.nextDue} />
            </div>
          </div>

          <section className="mt-10">
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

const PaymentRecordHistoryModal = ({
  record,
  onOpenChange,
}: {
  record: PaymentRecord | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const paymentLogs = record
    ? [
        {
          id: `${record.id}-record-latest`,
          paidDate: record.paidDate,
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: "Paid through transfer",
        },
        {
          id: `${record.id}-record-previous`,
          paidDate: record.paidDate,
          amount: record.rentAmount,
          previousDate: "July 16, 2026",
          nextDate: "August 16, 2027",
          method: "Paid through transfer",
        },
      ]
    : [];

  const paymentCount = record?.tenant === "Okoro Mgbachi" ? 2 : 4;
  const allPayment = record?.tenant === "Okoro Mgbachi" ? 700000 : 1000000;
  const displayProperty =
    record?.tenant === "Okoro Mgbachi"
      ? "Prince & Princess Estate"
      : record?.property;
  const displayUnit =
    record?.tenant === "Okoro Mgbachi" ? "Flat B" : record?.unit;

  return (
    <Modal
      open={Boolean(record)}
      onOpenChange={onOpenChange}
      width="620px"
      hideCloseButton
      className="max-h-[calc(100vh-3rem)] overflow-y-auto p-6 sm:p-8"
    >
      {record && (
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-lg font-medium text-[#1F2937]">
                <ReceiptText size={20} className="text-[#17A867]" />
                Payment history
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#031316]">
                {record.tenant}
              </h2>
              <p className="mt-2 text-base text-[#667085]">
                {displayProperty} - {displayUnit} - {record.frequency}
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

          <div className="mt-7 border-t border-[#DDE3EA] pt-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <HistoryMetric compact label="Payment count" value={paymentCount} />
              <HistoryMetric
                compact
                label="All payment"
                value={formatNaira(allPayment)}
              />
              <HistoryMetric compact label="Next date" value={record.nextDue} />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="h-14 w-full max-w-[480px] rounded-lg bg-[#167589] text-xl font-semibold text-white transition hover:bg-[#126779]"
            >
              Mark as Paid
            </button>
          </div>

          <section className="mt-10">
            <h3 className="text-xl font-semibold text-[#031316]">
              Payment Log
            </h3>

            <div className="relative mt-7 space-y-7 pl-16">
              <span className="absolute bottom-0 left-[18px] top-0 w-[3px] rounded-full bg-[#17A867]" />

              {paymentLogs.map((item) => (
                <article key={item.id} className="relative">
                  <span className="absolute -left-[57px] top-8 z-10 size-5 rounded-full border-4 border-[#173B67] bg-white" />

                  <div className="rounded-2xl border border-transparent bg-white px-5 py-5 shadow-sm">
                    <p className="text-base text-[#667085]">{item.paidDate}</p>
                    <p className="mt-2 text-2xl font-bold text-[#031316]">
                      {formatNaira(item.amount)}
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-5">
                      <div>
                        <p className="text-base text-[#667085]">
                          Previous date
                        </p>
                        <p className="mt-2 text-xl font-semibold text-[#031316]">
                          {item.previousDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-[#667085]">Next date</p>
                        <p className="mt-2 text-xl font-semibold text-[#031316]">
                          {item.nextDate}
                        </p>
                      </div>
                    </div>

                    <p className="mt-7 flex items-center gap-3 border-t border-[#DDE3EA] pt-4 text-base text-[#667085]">
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
