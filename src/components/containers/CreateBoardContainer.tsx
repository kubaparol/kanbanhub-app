import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CreateBoardForm } from "../forms/CreateBoardForm";

export interface CreateBoardContainerProps {}

export const CreateBoardContainer: FC<CreateBoardContainerProps> = () => {
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

        <CreateBoardForm onFormSubmit={(value) => console.log(value)} />
      </DialogContent>
    </Dialog>
  );
};
