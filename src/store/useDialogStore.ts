import { ReactNode } from "react";
import { create } from "zustand";
export type DialogRenderer<TProps = unknown> = (props?: TProps) => ReactNode;
interface DialogProps {
  title?: string;
  description?: string;
  width?: string | number;
  height?: string | number;
}

interface DialogState {
  isOpen: boolean;
  // Renderer dinámico
  props: DialogProps;
  renderer?: (props?: unknown) => ReactNode;

  openDialog: <TProps>(
    props: DialogProps,
    renderer: DialogRenderer<TProps>,
  ) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  renderer: undefined,
  props: {},
  openDialog: (props, renderer) =>
    set({
      isOpen: true,
      props,
      renderer: renderer as (props?: unknown) => ReactNode,
    }),
  closeDialog: () => {
    set((state) => ({
      ...state,
      isOpen: false,
    }));
    setTimeout(() => {
      set({
        props: undefined,
        renderer: undefined,
      });
    }, 200);
  },
}));
