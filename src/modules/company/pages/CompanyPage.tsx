import { Typography } from "@/components/ui/Typography";
import { BranchTable } from "../components/BranchTable";

const CompanyPage = () => {
  return (
    <div className="flex flex-col">
      <Typography variant="h3">Configuración general del sistema</Typography>
      <BranchTable />
    </div>
  );
};

export default CompanyPage;
