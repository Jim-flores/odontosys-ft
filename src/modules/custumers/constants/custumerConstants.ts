import { CustumerRequestDTO } from "../interfaces/types";

export const custumerConstantKey = "custumers";

export const formatStatus = (str: string, option: string) => {
  let filter: string | undefined = "";
  if (option === "name") {
    filter = custumerStatus.find((item) => item.value === str)?.name;
  } else {
    filter = custumerStatus.find((item) => item.value === str)?.color;
  }
  return filter;
};

export const custumerStatus = [
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

export const defaultCustumerAddValues: CustumerRequestDTO = {
  name: "",
  lastName: "",
  email: "",
  dni: "",
  phone: "",
  address: "",
  notes: "",
  status: "ACTIVE",
  branchId: "",
  userId: "",
};

export const CustumerStatusOptions = [
  { id: "1", name: "ACTIVO", value: "ACTIVE" },
  { id: "2", name: "INACTIVO", value: "INACTIVE" },
  { id: "3", name: "SUSPENDIDO", value: "SUSPENDED" },
];
