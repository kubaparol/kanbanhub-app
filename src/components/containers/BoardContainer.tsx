import {
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useEditColumnMutation,
  useEditTaskMutation,
  useGetBoardQuery,
} from "@/lib";
import { FC, useCallback, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Skeleton,
} from "../ui";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { Slash } from "lucide-react";
import { CreateColumnContainer } from "./CreateColumnContainer";
import { AlertModal } from "../base/AlertModal";
import { toast } from "sonner";
import { Column } from "@/services/api/modules/column/types";
import { Modal } from "../base/Modal";
import {
  CreateColumnForm,
  CreateColumnFormValues,
} from "../forms/CreateColumnForm";
import { NoDataPlaceholder } from "../shared/NoDataPlaceholder";
import { Task } from "@/services/api/modules/task/types";
import { CreateTaskForm, CreateTaskFormValues } from "../forms/CreateTaskForm";
import { ColumnContainer } from "./ColumnContainer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export interface BoardContainerProps {
  id?: string;
}

export const BoardContainer: FC<BoardContainerProps> = (props) => {
  const { id } = props;

  const [autoAnimate] = useAutoAnimate();

  const [columnToEdit, setColumnToEdit] = useState<Column | null>(null);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const { data: board, isLoading: isGettingBoard } = useGetBoardQuery({ id });

  const { mutateAsync: editColumn } = useEditColumnMutation();

  const { mutateAsync: deleteColumn, isPending: isDeletingColumn } =
    useDeleteColumnMutation();

  const { mutateAsync: editTask } = useEditTaskMutation(id!);

  const { mutateAsync: deleteTask, isPending: isDeletingTask } =
    useDeleteTaskMutation(id!);

  const editColumnHandler = useCallback(
    async (values: CreateColumnFormValues) => {
      try {
        if (!columnToEdit) return;

        await editColumn({ id: columnToEdit.id, ...values });

        setColumnToEdit(null);
        toast.success("Column edited successfully");
      } catch (error) {
        toast.error("Failed to edit column");
      }
    },
    [columnToEdit, editColumn]
  );

  const deleteColumnHandler = useCallback(async () => {
    try {
      if (!columnToDelete) return;

      await deleteColumn({ id: columnToDelete });

      setColumnToDelete(null);
      toast.success("Column deleted successfully");
    } catch (error) {
      toast.error("Failed to delete column");
    }
  }, [columnToDelete, deleteColumn]);

  const editTaskHandler = useCallback(
    async (values: CreateTaskFormValues) => {
      try {
        if (!taskToEdit) return;

        await editTask({ id: taskToEdit.id, ...values });

        setTaskToEdit(null);
        toast.success("Task edited successfully");
      } catch (error) {
        toast.error("Failed to edit task");
      }
    },
    [taskToEdit, editTask]
  );

  const deleteTaskHandler = useCallback(async () => {
    try {
      if (!taskToDelete) return;

      await deleteTask({ id: taskToDelete });

      setTaskToDelete(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  }, [taskToDelete, deleteTask]);

  const changeTaskOrderHandler = useCallback(
    async (order: number, columnId: string, taskId: string) => {
      try {
        await editTask({ id: taskId, columnId, order });
      } catch (error) {
        toast.error("Failed to change task order");
      }
    },
    [editTask]
  );

  const changeTaskColumnHandler = useCallback(
    async (taskId: string, columnId: string) => {
      try {
        await editTask({ id: taskId, columnId });
      } catch (error) {
        toast.error("Failed to change task column");
      }
    },
    [editTask]
  );

  return (
    <>
      {isGettingBoard && (
        <div className="grid gap-14">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-72" />
            <Skeleton className="h-[40px] w-[130px]" />
          </div>

          <div className="grid grid-flow-col auto-cols-[360px] gap-6">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      )}

      {!isGettingBoard && board && (
        <>
          <header className="flex-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link to={AppUrls.home}>Home</Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbPage>{board.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <CreateColumnContainer boardId={id} />
          </header>

          {board.columns.length === 0 ? (
            <NoDataPlaceholder
              title="No columns found"
              description="Create a new column to get started"
            />
          ) : (
            <ul
              className="grid grid-flow-col auto-cols-[360px] gap-6 items-start overflow-x-auto flex-1"
              ref={autoAnimate}
            >
              {board?.columns.map((column) => (
                <li key={column.id} className="grid gap-4">
                  <ColumnContainer
                    boardId={board.id}
                    column={column}
                    onEditColumnClick={() => setColumnToEdit(column)}
                    onDeleteColumnClick={() => setColumnToDelete(column.id)}
                    onEditTaskClick={(task) => setTaskToEdit(task)}
                    onDeleteTaskClick={(taskId) => setTaskToDelete(taskId)}
                    onChangeTaskOrder={(order, taskId) =>
                      changeTaskOrderHandler(order, column.id, taskId)
                    }
                    onChangeTaskColumn={(taskId) =>
                      changeTaskColumnHandler(taskId, column.id)
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Modal
        open={!!columnToEdit}
        onOpenChange={() => setColumnToEdit(null)}
        title="Edit column"
        description="Update the details below to edit the column"
      >
        <CreateColumnForm
          initialValues={{ name: columnToEdit?.name || "", boardId: id || "" }}
          onFormSubmit={editColumnHandler}
        />
      </Modal>

      <AlertModal
        open={!!columnToDelete}
        onOpenChange={() => setColumnToDelete(null)}
        title="Are you absolutely sure?"
        description="This action cannot be undone. It will permanently delete the column and all tasks contained within it."
        isLoading={isDeletingColumn}
        onConfirm={deleteColumnHandler}
      />

      <Modal
        open={!!taskToEdit}
        onOpenChange={() => setTaskToEdit(null)}
        title="Edit task"
        description="Update the details below to edit the task"
      >
        <CreateTaskForm
          boardId={id!}
          initialValues={{
            name: taskToEdit?.name || "",
            columnId: taskToEdit?.columnId || "",
          }}
          onFormSubmit={editTaskHandler}
        />
      </Modal>

      <AlertModal
        open={!!taskToDelete}
        onOpenChange={() => setTaskToDelete(null)}
        title="Are you absolutely sure?"
        description="This action cannot be undone. It will permanently delete the task."
        isLoading={isDeletingTask}
        onConfirm={deleteTaskHandler}
      />
    </>
  );
};
