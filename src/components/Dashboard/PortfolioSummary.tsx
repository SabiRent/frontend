import HouseGreen from "@/assets/icons/house-green.svg?react";
import HouseRed from "@/assets/icons/house-red.svg?react";
import LabHouses from "@/assets/icons/lab-houses.svg?react";
import Profile2User from "@/assets/icons/profile-2user.svg?react";
import ProfileUserBlue from "@/assets/icons/profile-user-blue.svg?react";
import { AppRoutes } from "@/constants/routes";
import { Link } from "react-router";

const portfolioSummary = [
  {
    label: "Total Properties",
    value: 12,
    iconBackground: "bg-[#E9EBEF]",
    link: AppRoutes.dashboardProperties,
    icon: LabHouses,
  },
  {
    label: "Total Units",
    value: 48,
    iconBackground: "bg-[#FFF7B0]",
    link: AppRoutes.dashboardUnits,
    icon: Profile2User,
  },
  {
    label: "Occupied Units",
    value: 36,
    iconBackground: "bg-[#FBE7E7]",
    link: AppRoutes.dashboardUnits,
    icon: HouseRed,
  },
  {
    label: "Vacant Units",
    value: 12,
    iconBackground: "bg-[#E7FBF2]",
    link: AppRoutes.dashboardUnits,
    icon: HouseGreen,
  },
  {
    label: "Total Tenants",
    value: 42,
    iconBackground: "bg-[#E8F1F3]",
    link: AppRoutes.dashboardTenants,
    icon: ProfileUserBlue,
  },
];

const PortfolioSummary = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-bold">Portfolio Summary</p>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {portfolioSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-white px-4 py-3 shadow-sm shadow-[#FFE6FE80] sm:px-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconBackground}`}
              >
                <item.icon />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#111111]">{item.label}</p>
                <p className="text-xl font-bold text-[#000000]">{item.value}</p>
              </div>
            </div>

            <Link
              className="mt-3 inline-block pl-1 text-[10px] text-[#687B94] hover:font-medium hover:underline"
              to={item.link}
            >
              View all
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSummary;
