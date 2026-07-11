import { UserRequestDTO } from "../interfaces/types";

export const userConstantKey = "users";
export const formatStatus = (str: string, option: string) => {
  let filter: string | undefined = "";
  if (option === "name") {
    filter = userStatus.find((user) => user.value === str)?.name;
  } else {
    filter = userStatus.find((user) => user.value === str)?.color;
  }
  return filter;
};
export const userStatus = [
  {
    id: "1",
    name: "ACTIVO",
    value: "ACTIVE",
    color: "text-(--color-ready-text) bg-(--color-ready-bg)",
  },
  {
    id: "2",
    name: "INACTIVO",
    value: "INACTIVE",
    color: "text-(--color-decl-text) bg-(--color-decl-bg)",
  },
  {
    id: "3",
    name: "SUSPENDIDO",
    value: "SUSPENDED",
    color: "text-(--color-await-text) bg-(--color-await-bg)",
  },
];
export const defaultUserAddValues: UserRequestDTO = {
  name: "",
  lastName: "",
  email: "",
  dni: "",
  phone: "",
  address: "",
  status: "ACTIVE",
  password: "",
  confirmPassword: "",
  branches: [],
  roles: "",
};
export const UserStatus: { id: string; name: string; value: string }[] = [
  { id: "1", name: "ACTIVO", value: "ACTIVE" },
  { id: "2", name: "INACTIVO", value: "INACTIVE" },
  { id: "3", name: "SUSPENDIDO", value: "SUSPENDED" },
];
