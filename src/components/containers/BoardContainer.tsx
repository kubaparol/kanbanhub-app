import {
  useDeleteColumnMutation,
  useEditColumnMutation,
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
import {
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Slash,
  Trash2,
} from "lucide-react";
import { CreateColumnContainer } from "./CreateColumnContainer";
import { EmptyBoardPlaceholder } from "../shared/EmptyBoardPlaceholder";
import { AlertModal } from "../base/AlertModal";
import { toast } from "sonner";
import { Column } from "@/services/api/modules/column/types";
import { Modal } from "../base/Modal";
import {
  CreateColumnForm,
  CreateColumnFormValues,
} from "../forms/CreateColumnForm";

export interface BoardContainerProps {
  id?: string;
}

export const BoardContainer: FC<BoardContainerProps> = (props) => {
  const { id } = props;

  const [columnToEdit, setColumnToEdit] = useState<Column | null>(null);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);

  const { data: board, isFetching: isGettingBoard } = useGetBoardQuery({ id });

  const { mutateAsync: editColumn } = useEditColumnMutation();

  const { mutateAsync: deleteColumn, isPending: isDeletingColumn } =
    useDeleteColumnMutation();

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
      toast.success("Board deleted successfully");
    } catch (error) {
      toast.error("Failed to delete board");
    }
  }, [columnToDelete, deleteColumn]);

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
            <EmptyBoardPlaceholder />
          ) : (
            <ul className="grid grid-flow-col auto-cols-[minmax(300px,_400px)] gap-6">
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

                  <ul className="grid gap-4">
                    {/* <li className="bg-yellow-100 shadow-sm py-2 px-4 rounded-lg">
                    Task 1
                  </li> */}
                  </ul>

                  <Button variant="outline" className="w-full mt-auto">
                    Add task
                    <PlusCircle className="ml-2 size-4" />
                  </Button>
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
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={isDeletingColumn}
        onConfirm={deleteColumnHandler}
      />
    </>
  );
};
