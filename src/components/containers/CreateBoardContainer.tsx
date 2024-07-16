import { FC, useCallback } from "react";
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

export interface CreateBoardContainerProps {}

export const CreateBoardContainer: FC<CreateBoardContainerProps> = () => {
  const { mutateAsync: createBoard } = useCreateBoardMutation();

  const createBoardHandler = useCallback(
    async (values: CreateBoardFormValues) => {
      try {
        await createBoard(values);
      } catch (error) {
        console.error(error);
      }
    },
    [createBoard]
  );

  return (
    <Dialog>
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
