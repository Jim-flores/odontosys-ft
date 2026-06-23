interface RolesProps {
  id: string;
  name: string;
}
interface PermissionsProps {
  id: string;
  key: string;
}
interface ProfileProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  branchId: string;
  branch: {
    id: string;
    name: string;
  };
  roles: RolesProps[];
  permissions: PermissionsProps[];
}
interface BranchesListProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;
}
interface CompanyProps {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  createdAt: string;
}
