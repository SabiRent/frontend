import { CircleAlert, CircleCheck, Clock3 } from "lucide-react";

const paymentSummary = [
  {
    label: "Paid",
    amount: "₦2,450,000",
    icon: CircleCheck,
    iconColor: "text-[#00CC78]",
  },
  {
    label: "Due Soon",
    amount: "₦350,000",
    icon: Clock3,
    iconColor: "text-[#FFD600]",
  },
  {
    label: "Overdue",
    amount: "₦180,000",
    icon: CircleAlert,
    iconColor: "text-[#A80000]",
  },
];

const PaymentSummary = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {paymentSummary.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex min-h-28 items-center gap-4 rounded-lg bg-white px-5 py-4 shadow-sm shadow-[#FFE6FE80] sm:gap-6"
          >
            <Icon
              size={64}
              strokeWidth={1.2}
              className={`shrink-0 ${item.iconColor}`}
              aria-hidden="true"
            />

            <div className="space-y-1">
              <p className="text-xs text-[#111111]">{item.label}</p>
              <p className="text-lg font-bold sm:text-xl">{item.amount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentSummary;
