import DetailedDashboard from "@/components/Dashboard/DetailedDashboard";
import EmptyDashboard from "@/components/Dashboard/EmptyDashboard";
import { properties } from "@/data";

const Dashboard = () => {
  const hasProperties = properties.length > 0;

  return <>{hasProperties ? <DetailedDashboard /> : <EmptyDashboard />}</>;
};

export default Dashboard;
