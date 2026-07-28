import { Link } from "react-router";

import { AppRoutes } from "@/constants/routes";
import { upcomingPayments } from "@/data";

const UpcomingPayment = () => {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#111111]">
          Upcoming Payments
        </h2>
        <Link
          to={AppRoutes.dashboardPayments}
          className="text-xs font-semibold text-[#687B94] hover:underline hover:font-bold"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3 rounded-lg border border-[#D0D5DD] p-4">
        {upcomingPayments.map((payment) => (
          <div
            key={`${payment.tenant}-${payment.property}-${payment.unit}`}
            className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-[0_2px_8px_rgba(255,230,254,0.5)]"
          >
            <div>
              <p className="text-sm font-medium text-[#111111]">
                {payment.tenant} - {payment.property}, {payment.unit}
              </p>
              <p className="mt-1 text-xs text-[#111111]">{payment.dueDate}</p>
            </div>
            <p
              className={`shrink-0 text-sm font-bold ${payment.highlighted ? "text-[#00CC78]" : "text-[#111111]"}`}
            >
              {payment.amount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingPayment;
