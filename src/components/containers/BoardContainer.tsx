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
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "../ui";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { MoreHorizontal, Pencil, Slash, Trash2 } from "lucide-react";
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
import { CreateTaskContainer } from "./CreateTaskContainer";
import { TaskCard } from "../shared/TaskCard";
import { Task } from "@/services/api/modules/task/types";
import { CreateTaskForm, CreateTaskFormValues } from "../forms/CreateTaskForm";

export interface BoardContainerProps {
  id?: string;
}

export const BoardContainer: FC<BoardContainerProps> = (props) => {
  const { id } = props;

  const [columnToEdit, setColumnToEdit] = useState<Column | null>(null);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const { data: board, isFetching: isGettingBoard } = useGetBoardQuery({ id });

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

  return (
    <>
      {isGettingBoard && <Skeleton className="h-5 w-72" />}

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
            <ul className="grid grid-flow-col auto-cols-[minmax(300px,_400px)] gap-6 items-start overflow-x-scroll">
              {board?.columns.map((column) => (
                <li
                  key={column.id}
                  className="flex flex-col gap-4 shadow-lg rounded-lg bg-teal-50 backdrop-blur-sm p-4"
                >
                  <header className="flex-between">
                    <p className="text-lg font-semibold">{column.name}</p>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal size={20} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setColumnToEdit(column)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setColumnToDelete(column.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </header>

                  {column.tasks.length === 0 && (
                    <p className="text-center italic text-gray-400 font-light text-sm py-4">
                      No tasks
                    </p>
                  )}

                  {column.tasks.length > 0 && (
                    <ul className="grid gap-4">
                      {column.tasks.map((task) => (
                        <li key={task.id}>
                          <TaskCard
                            task={task}
                            onEditClick={() => setTaskToEdit(task)}
                            onDeleteClick={() => setTaskToDelete(task.id)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  <CreateTaskContainer
                    boardId={board.id}
                    columnId={column.id}
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
