import {
  useGetBoardsQuery,
  useDeleteBoardMutation,
  useEditBoardMutation,
} from "@/lib/react-query";
import { FC, useCallback, useState } from "react";
import { Skeleton } from "../ui";
import { toast } from "sonner";
import { AlertModal } from "../base/AlertModal";
import { Modal } from "../base/Modal";
import {
  CreateBoardForm,
  CreateBoardFormValues,
} from "../forms/CreateBoardForm";
import { Board } from "@/services/api/modules/board/types";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { NoDataPlaceholder } from "../shared/NoDataPlaceholder";
import { BoardCard } from "../shared/BoardCard";

export interface BoardListContainerProps {}

export const BoardListContainer: FC<BoardListContainerProps> = () => {
  const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  const { data: boards, isFetching: isGettingBoards } = useGetBoardsQuery();

  const { mutateAsync: editBoard } = useEditBoardMutation();

  const { mutateAsync: deleteBoard, isPending: isDeletingBoard } =
    useDeleteBoardMutation();

  const editBoardHandler = useCallback(
    async (values: CreateBoardFormValues) => {
      try {
        if (!boardToEdit) return;

        await editBoard({ id: boardToEdit.id, ...values });

        setBoardToEdit(null);
        toast.success("Board edited successfully");
      } catch (error) {
        toast.error("Failed to edit board");
      }
    },
    [boardToEdit, editBoard]
  );

  const deleteBoardHandler = useCallback(async () => {
    try {
      if (!boardToDelete) return;

      await deleteBoard({ id: boardToDelete });

      setBoardToDelete(null);
      toast.success("Column deleted successfully");
    } catch (error) {
      toast.error("Failed to delete column");
    }
  }, [boardToDelete, deleteBoard]);

  return (
    <>
      {!isGettingBoards && boards?.length === 0 && (
        <NoDataPlaceholder
          title="No boards found"
          description="Create a new board to get started"
        />
      )}

      <ul className="h-fit grid gap-6 grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {isGettingBoards &&
          Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-[90px]" />
            </li>
          ))}

        {!isGettingBoards &&
          boards &&
          boards?.length > 0 &&
          boards?.map((board) => (
            <li key={board.id}>
              <Link to={AppUrls.board(board.id)}>
                <BoardCard
                  board={board}
                  onEditClick={() => setBoardToEdit(board)}
                  onDeleteClick={() => setBoardToDelete(board.id)}
                />
              </Link>
            </li>
          ))}
      </ul>
      <Modal
        open={!!boardToEdit}
        onOpenChange={() => setBoardToEdit(null)}
        title="Edit board"
        description="Update the details below to edit the board"
      >
        <CreateBoardForm
          initialValues={{
            name: boardToEdit?.name || "",
            description: boardToEdit?.description || "",
          }}
          onFormSubmit={editBoardHandler}
        />
      </Modal>
      <AlertModal
        open={!!boardToDelete}
        onOpenChange={() => setBoardToDelete(null)}
        title="Are you absolutely sure?"
        description="This action cannot be undone. It will permanently delete the board, all its columns and any tasks contained within them."
        isLoading={isDeletingBoard}
        onConfirm={deleteBoardHandler}
      />
    </>
  );
};
