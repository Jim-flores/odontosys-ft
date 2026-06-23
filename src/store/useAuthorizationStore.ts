import api from "@/api/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AuthProps {
  roles: { id: string; name: string }[];
  permissions: { id: string; key: string }[];
}
interface AuthorizationProps {
  roles: { id: string; name: string }[];
  permissions: { id: string; key: string }[];
  setRoles: (roles: { id: string; name: string }[]) => void;
  setPermissions: (permissions: { id: string; key: string }[]) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  clearAuthorization: () => void;
}
export const useAuthorizationStore = create<AuthorizationProps>()(
  persist(
    (set) => ({
      roles: [],
      permissions: [],
      setRoles: (roles: { id: string; name: string }[]) => set({ roles }),
      setPermissions: (permissions: { id: string; key: string }[]) =>
        set({ permissions }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
      clearAuthorization: () => set({ roles: [], permissions: [] }),
    }),
    {
      name: "authorization-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);

// Lista de todos los permisos
export const getAuthorization = async () => {
  try {
    const state = useAuthorizationStore.getState();
    const { data } = await api.get<AuthProps>("/permissions");
    state.setPermissions(data.permissions);
    state.setRoles(data.roles);
  } catch (error) {
    console.error("Error fetching permissions", error);
  }
};
