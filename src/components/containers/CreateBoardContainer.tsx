import { FC, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  CreateBoardForm,
  CreateBoardFormValues,
} from "../forms/CreateBoardForm";
import { useCreateBoardMutation } from "@/lib/react-query/mutations";
import { toast } from "sonner";

export interface CreateBoardContainerProps {}

export const CreateBoardContainer: FC<CreateBoardContainerProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: createBoard } = useCreateBoardMutation();

  const createBoardHandler = useCallback(
    async (values: CreateBoardFormValues) => {
      try {
        await createBoard(values);

        setIsOpen(false);
        toast.success("Board created successfully");
      } catch (error) {
        toast.error("Failed to create board");
      }
    },
    [createBoard]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create board</Button>
      </DialogTrigger>

      <DialogContent className="grid gap-8">
        <DialogHeader>
          <DialogTitle className="text-18-bold md:text-24-bold">
            Create a new board
          </DialogTitle>

          <DialogDescription className="text-14-regular md:text-16-regular">
            Fill in the details below to create a new board
          </DialogDescription>
        </DialogHeader>

        <CreateBoardForm onFormSubmit={createBoardHandler} />
      </DialogContent>
    </Dialog>
  );
};
