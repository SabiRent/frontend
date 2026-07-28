import avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/Button/Button";
import PaymentSummary from "@/components/Dashboard/PaymentSummary";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import UpcomingPayment from "@/components/Dashboard/UpcomingPayment";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DetailedDashboard = () => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  return (
    <>
      <div className="mt-4 flex flex-col gap-8 mb-10">
        <div className="flex justify-between items-center">
          <h6 className="font-semibold text-[#111] text-2xl font-heading">
            Dashboard
          </h6>

          <Button
            variant="outline"
            size="lg"
            className="px-6 mt-4"
            onClick={() => setIsAddPropertyOpen(true)}
          >
            <Plus className="mr-1 h-5 w-5" />
            <span>Add Property</span>
          </Button>
        </div>

        <div className="flex justify-between gap-6 items-center flex-col md:flex-row">
          <div className="flex items-center gap-4 flex-1 ">
            <img
              src={avatar}
              alt="User Avatar"
              className="h-20 w-20 rounded-full"
            />
            <div className="space-y-2">
              <h6 className="text-2xl font-semibold">Welcome back, Raymond!</h6>
              <p className="text-sm">
                Here’s what’s happening with your properties today
              </p>
            </div>
          </div>
          <div className="">
            <SearchBar
              placeholder="Search"
              className=" bg-transparent w-md border-2"
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
        onSubmit={() => {
          toast.success("Property details are ready to submit.");
          setIsAddPropertyOpen(false);
        }}
      />
    </>
  );
};

export default DetailedDashboard;
