import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import PaymentSummary from "@/components/Dashboard/PaymentSummary";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import UpcomingPayment from "@/components/Dashboard/UpcomingPayment";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useAuthStore } from "@/stores/authStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AppRoutes } from "@/constants/routes";

const DetailedDashboard = () => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  return (
    <>
      <div className="mb-10 mt-4 flex flex-col gap-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h6 className="font-semibold text-[#111] text-2xl font-heading">
            Dashboard
          </h6>

          <Button
            variant="outline"
            size="lg"
            className="mt-1 w-full px-6 sm:mt-0 sm:w-auto"
            onClick={() => setIsAddPropertyOpen(true)}
          >
            <Plus className="mr-1 h-5 w-5" />
            <span>Add Property</span>
          </Button>
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-4">
            <Avatar
              fullname={user?.fullName}
              src={user?.avatarUrl}
              size="lg"
              alt={user?.fullName ?? "User avatar"}
            />
            <div className="space-y-2">
              <h6 className="text-2xl font-semibold">
                Welcome back, {firstName}!
              </h6>
              <p className="text-sm">
                Here’s what’s happening with your properties today
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <SearchBar
              placeholder="Search"
              className="w-full border-2 bg-transparent md:w-md"
            />
          </div>
        </div>

        <PortfolioSummary />
        <PaymentSummary />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <UpcomingPayment />
          <RecentActivity />
        </div>
      </div>

      <AddPropertyModal
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
        onSuccess={() => {
          navigate(AppRoutes.dashboardProperties);
        }}
      />
    </>
  );
};

export default DetailedDashboard;
