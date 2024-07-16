import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export interface AlertModalProps extends AlertDialogProps {
  title: string;
  description: string;
  isLoading?: boolean;
  onConfirm?: () => void;
}

export const AlertModal: FC<AlertModalProps> = (props) => {
  const { title, description, isLoading, onConfirm, ...rest } = props;

  return (
    <AlertDialog {...rest}>
      <AlertDialogContent className="grid gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>

          <AlertDialogDescription className="text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
