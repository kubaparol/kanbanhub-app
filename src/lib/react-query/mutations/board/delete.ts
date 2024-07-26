import { api } from "@/services";
import { Board, DeleteBoardRequest } from "@/services/api/modules/board/types";
import { useMutation } from "@tanstack/react-query";
import { BOARDS_QUERY_KEY } from "../../queries";
import { queryClient } from "../..";

export const useDeleteBoardMutation = () => {
  return useMutation({
    mutationFn: (data: DeleteBoardRequest) => api.board.delete(data),
    onSuccess: (board) => {
      queryClient.setQueryData(
        [BOARDS_QUERY_KEY],
        (previousBoards: Board[]) => {
          if (!previousBoards) return undefined;

          return previousBoards.filter((previous) => previous.id !== board.id);
        }
      );
    },
  });
};
