import { useDialogStore } from "@/store/useDialogStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const AppDialog = () => {
  const { isOpen, renderer, props, closeDialog } = useDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent
        style={{
          width: props?.width,
          height: props?.height,
        }}
        aria-describedby=""
      >
        <DialogHeader>
          {props?.title && <DialogTitle>{props.title}</DialogTitle>}
          {props?.description && (
            <DialogDescription>{props.description}</DialogDescription>
          )}
        </DialogHeader>
        {renderer?.()}
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
