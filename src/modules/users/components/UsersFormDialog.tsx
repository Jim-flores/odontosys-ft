import { useBranchStore } from "@/store/useBranchStore";

export const UserFormDialog = () => {
  const { branch } = useBranchStore();
  console.log(branch);
  return <div>xd</div>;
};
