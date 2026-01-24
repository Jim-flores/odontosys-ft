import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

const UsersPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Typography variant="h2">Lista de usuarios</Typography>
        <Button>Agregar</Button>
      </div>
    </div>
  );
};
export default UsersPage;
