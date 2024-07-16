import { api } from "@/services";
import { Board, CreateBoardRequest } from "@/services/api/modules/board/types";
import { useMutation } from "@tanstack/react-query";
import { BOARDS_QUERY_KEY } from "../../queries";
import { queryClient } from "../..";

export const useCreateBoardMutation = () => {
  return useMutation({
    mutationFn: (data: CreateBoardRequest) => api.board.create(data),
    onSuccess: (board) => {
      queryClient.setQueryData(
        [BOARDS_QUERY_KEY],
        (previousBoards: Board[]) => {
          if (!previousBoards) undefined;

          return [...previousBoards, board];
        }
      );
    },
  });
};
