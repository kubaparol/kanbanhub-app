import { api } from "@/services";
import { Board, EditBoardRequest } from "@/services/api/modules/board/types";
import { useMutation } from "@tanstack/react-query";
import { BOARDS_QUERY_KEY } from "../../queries";
import { queryClient } from "../..";

export const useEditBoardMutation = () => {
  return useMutation({
    mutationFn: (data: EditBoardRequest) => api.board.edit(data),
    onSuccess: (board) => {
      queryClient.setQueryData(
        [BOARDS_QUERY_KEY],
        (previousBoards: Board[]) => {
          if (!previousBoards) undefined;

          return previousBoards.map((prevBoard) =>
            prevBoard.id === board.id ? board : prevBoard
          );
        }
      );
    },
  });
};
