import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "@/api/api";

interface CompanyStore {
  company: CompanyProps;
  hasHydrated: boolean;
  setCompany: (company: CompanyProps) => void;
  clearCompany: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      company: {
        id: "",
        name: "",
        description: "",
        logoUrl: "",
        createdAt: "",
      },
      hasHydrated: false,
      setCompany: (company: CompanyProps) => set({ company }),
      clearCompany: () => {
        set({
          company: {
            id: "",
            name: "",
            description: "",
            logoUrl: "",
            createdAt: "",
          },
        });
        sessionStorage.removeItem("company-store");
      },
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);

export const getCompany = async () => {
  const state = useCompanyStore.getState();
  const { data } = await api.get<CompanyProps>("company/actual");
  state.setCompany(data);
};
