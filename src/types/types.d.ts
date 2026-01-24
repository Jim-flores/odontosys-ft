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
  roles: RolesProps[];
  permissions: PermissionsProps[];
}
