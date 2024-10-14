import { FC, useCallback, useState } from "react";
import { toast } from "sonner";
import { Modal } from "../base/Modal";
import { Button } from "../ui";
import { useCreateTaskMutation } from "@/lib/react-query";
import { CreateTaskForm, CreateTaskFormValues } from "../forms/CreateTaskForm";
import { PlusCircle } from "lucide-react";

export interface CreateTaskContainerProps {
  boardId: string;
  columnId?: string;
}

export const CreateTaskContainer: FC<CreateTaskContainerProps> = (props) => {
  const { boardId, columnId } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: createTask } = useCreateTaskMutation(boardId);

  const createTaskHandler = useCallback(
    async (values: CreateTaskFormValues) => {
      try {
        await createTask({
          ...values,
        });

        setIsOpen(false);
        toast.success("Task created successfully");
      } catch (error) {
        toast.error("Failed to create task");
        console.log(error);
      }
    },
    [createTask]
  );

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full mt-auto"
      >
        Create task <PlusCircle className="ml-2 size-4" />
      </Button>

      <Modal
        open={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title="Create a new task"
        description="Fill in the details below to create a new task"
      >
        <CreateTaskForm
          boardId={boardId}
          onFormSubmit={createTaskHandler}
          initialValues={{ columnId }}
        />
      </Modal>
    </>
  );
};
