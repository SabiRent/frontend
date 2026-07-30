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
      <div className="h-screen flex justify-center items-center flex-col gap-8 box-border">
        <div>
          <img src={houseImage} alt="house_placeholder" />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center max-w-xl text-center">
          <h4 className="font-semibold text-4xl font-heading">
            No property yet
          </h4>
          <p className="text-gray-600 text-lg">
            Welcome to My Compound. Add your first property to start managing
            units, tenants, and rent.
          </p>

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
