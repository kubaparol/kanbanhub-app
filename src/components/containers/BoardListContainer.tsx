import { useGetBoardsQuery, useDeleteBoardMutation } from "@/lib/react-query";
import { FC, useCallback, useState } from "react";
import { BoardCard } from "../shared/board-card";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { AlertModal } from "../base/AlertModal";
import { Modal } from "../base/Modal";

export interface BoardListContainerProps {}

export const BoardListContainer: FC<BoardListContainerProps> = () => {
  const [boardToEdit, setBoardToEdit] = useState<string | null>(null);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  const { data: boards, isFetching: isGettingBoards } = useGetBoardsQuery();
  const { mutateAsync: deleteBoard, isPending: isDeletingBoard } =
    useDeleteBoardMutation();

  const deleteBoardHandler = useCallback(async () => {
    try {
      if (!boardToDelete) return;

      await deleteBoard({ id: boardToDelete });

      toast.success("Board deleted successfully");
    } catch (error) {
      toast.error("Failed to delete board");
    }
  }, [boardToDelete, deleteBoard]);

  return (
    <>
      <ul className="grid gap-4">
        {isGettingBoards &&
          Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-[90px]" />
            </li>
          ))}

        {!isGettingBoards &&
          boards?.map((board) => (
            <li key={board.id}>
              <BoardCard
                board={board}
                onEditClick={() => setBoardToEdit(board.id)}
                onDeleteClick={() => setBoardToDelete(board.id)}
              />
            </li>
          ))}
      </ul>

      <Modal
        open={!!boardToEdit}
        onOpenChange={() => setBoardToEdit(null)}
        title="Edit board"
        description="Update the details below to edit the board"
      >
        <CreateBoardForm onFormSubmit={createBoardHandler} />
      </Modal>

      <AlertModal
        open={!!boardToDelete}
        onOpenChange={() => setBoardToDelete(null)}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={isDeletingBoard}
        onConfirm={deleteBoardHandler}
      />
    </>
  );
};
