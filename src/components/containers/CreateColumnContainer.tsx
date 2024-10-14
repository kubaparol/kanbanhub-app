import { FC, useCallback, useState } from "react";
import { toast } from "sonner";
import { Modal } from "../base/Modal";
import { Button } from "../ui";
import { useCreateColumnMutation } from "@/lib/react-query";
import {
  CreateColumnForm,
  CreateColumnFormValues,
} from "../forms/CreateColumnForm";

export interface CreateColumnContainerProps {
  boardId?: string;
}

export const CreateColumnContainer: FC<CreateColumnContainerProps> = (
  props
) => {
  const { boardId } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: createColumn } = useCreateColumnMutation();

  const createColumnHandler = useCallback(
    async (values: CreateColumnFormValues) => {
      try {
        await createColumn({
          ...values,
        });

        setIsOpen(false);
        toast.success("Column created successfully");
      } catch (error) {
        toast.error("Failed to create column");
        console.log(error);
      }
    },
    [createColumn]
  );

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create column</Button>

      <Modal
        open={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title="Create a new column"
        description="Fill in the details below to create a new column"
      >
        <CreateColumnForm
          onFormSubmit={createColumnHandler}
          initialValues={{ boardId: boardId! }}
        />
      </Modal>
    </>
  );
};
