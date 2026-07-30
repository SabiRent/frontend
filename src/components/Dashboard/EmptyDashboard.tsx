import houseImage from "@/assets/images/empty-property.png";
import { Button } from "@/components/Button/Button";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import { AppRoutes } from "@/constants/routes";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const EmptyDashboard = () => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="box-border flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-8 py-10">
        <div>
          <img
            src={houseImage}
            alt="house_placeholder"
            className="mx-auto max-h-[260px] w-full max-w-[360px] object-contain"
          />
        </div>
        <div className="flex max-w-xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
          <h4 className="font-heading text-3xl font-semibold sm:text-4xl">
            No property yet
          </h4>
          <p className="text-base text-gray-600 sm:text-lg">
            Welcome to My Compound. Add your first property to start managing
            units, tenants, and rent.
          </p>

          <Button
            variant="outline"
            size="lg"
            className="mt-2 w-full px-6 sm:mt-4 sm:w-auto"
            onClick={() => setIsAddPropertyOpen(true)}
          >
            <Plus className="mr-1 h-5 w-5" />
            <span>Add Property</span>
          </Button>
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

export default EmptyDashboard;
