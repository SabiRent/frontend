import DetailedDashboard from "@/components/Dashboard/DetailedDashboard";
import EmptyDashboard from "@/components/Dashboard/EmptyDashboard";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useProperties } from "@/hooks/useProperties";
import { ScaleLoader } from "react-spinners";

const Dashboard = () => {
  const { data, isLoading } = useProperties({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <ScaleLoader color="#167589" height={60} width={5} />
      </div>
    );
  }

  const hasProperties = (data?.pagination?.total ?? 0) > 0;

  return <>{hasProperties ? <DetailedDashboard /> : <EmptyDashboard />}</>;
};

export default Dashboard;
