import { DialogProps } from "@radix-ui/react-dialog";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export interface ModalProps extends DialogProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { title, description, children, ...rest } = props;

  return (
    <Dialog {...rest}>
      <DialogContent className="grid gap-8">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>

          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
