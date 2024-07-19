import { FC, useCallback, useState } from "react";
import {
  CreateBoardForm,
  CreateBoardFormValues,
} from "../forms/CreateBoardForm";
import { useCreateBoardMutation } from "@/lib/react-query";
import { toast } from "sonner";
import { Modal } from "../base/Modal";
import { Button } from "../ui";

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
    <>
      <Button onClick={() => setIsOpen(true)}>Create board</Button>

      <Modal
        open={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title="Create a new board"
        description="Fill in the details below to create a new board"
      >
        <CreateBoardForm onFormSubmit={createBoardHandler} />
      </Modal>
    </>
  );
};
