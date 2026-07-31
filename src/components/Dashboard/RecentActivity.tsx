import { Link } from "react-router";

import { AppRoutes } from "@/constants/routes";
import { recentActivities } from "@/data";

const RecentActivity = () => {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#111111]">Recent Activity</h2>
        <Link
          to={AppRoutes.dashboardNotifications}
          className="text-xs font-semibold text-[#687B94] hover:underline hover:font-bold"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3 rounded-lg border-[0.5px] border-[#C3C5C6] p-4">
        {recentActivities.map((activity, index) => (
          <div
            key={`${activity.activity}-${activity.date}-${index}`}
            className="flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-[0_2px_8px_rgba(255,230,254,0.5)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <p className="text-sm font-medium text-[#111111]">
              {activity.activity}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0 sm:gap-6">
              {activity.amount && (
                <p className="text-sm font-bold text-[#00CC78]">
                  {activity.amount}
                </p>
              )}
              <p className="text-xs text-[#111111]">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
