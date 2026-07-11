import { apiClient } from "@/utils/apiClient";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserProps extends ProfileProps {
  hasHydrated: boolean;
  setUser: ({
    id,
    status,
    name,
    lastName,
    email,
    createdAt,
    permissions,
    roles,
  }: UserProps) => void;
  clearUser: () => void;
  setHasHydrated: (state: boolean) => void;
}
export const useProfileStore = create<UserProps>()(
  persist(
    (set) => ({
      id: "",
      name: "",
      lastName: "",
      email: "",
      status: "",
      createdAt: "",
      branchId: "",
      branches: [],
      permissions: [],
      roles: [],
      hasHydrated: false,
      setUser: ({
        id,
        name,
        lastName,
        email,
        roles,
        createdAt,
        permissions,
        status,
        branches,
      }: ProfileProps) =>
        set({
          id,
          name,
          lastName,
          email,
          roles,
          createdAt,
          permissions,
          status,
          branches,
        }),
      clearUser: () => {
        set({
          id: "",
          name: "",
          lastName: "",
          email: "",
          status: "",
          createdAt: "",
          branches: [],
          permissions: [],
          roles: [],
        });
        sessionStorage.removeItem("profile-store");
      },
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);

export const getProfile = async () => {
  try {
    const state = useProfileStore.getState();
    const { data } = await apiClient.get<UserProps>("/auth/profile");
    state.setUser(data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
