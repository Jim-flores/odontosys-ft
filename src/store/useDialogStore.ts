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
  renderer?: (props?: unknown) => ReactNode;

  props: DialogProps;
  openDialog: <TProps>(
    renderer: DialogRenderer<TProps>,
    props?: DialogProps,
  ) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  renderer: undefined,
  props: {},
  openDialog: (renderer, props) =>
    set({
      isOpen: true,
      renderer: renderer as (props?: unknown) => ReactNode,
      props,
    }),
  closeDialog: () => {
    set((state) => ({
      ...state,
      isOpen: false,
    }));
    setTimeout(() => {
      set({
        renderer: undefined,
        props: undefined,
      });
    }, 200);
  },
}));
