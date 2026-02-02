import api from "@/api/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BranchesProps {
  branch: BranchesListProps[];
  hasHydrated: boolean;
  setBranch: (branch: BranchesListProps[]) => void;
  clearBranch: () => void;
  setHasHydrated: (state: boolean) => void;
}
export const useBranchStore = create<BranchesProps>()(
  persist(
    (set) => ({
      branch: [],
      hasHydrated: false,
      setBranch: (branch: BranchesListProps[]) => set({ branch }),
      clearBranch: () => {
        set({
          branch: [],
        });
        sessionStorage.removeItem("branch-store");
      },
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "branch-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);

export const getBranches = async () => {
  const state = useBranchStore.getState();
  const { data } = await api.get<BranchesListProps[]>("branches/list");
  state.setBranch(data);
};
