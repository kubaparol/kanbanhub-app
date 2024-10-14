import { api } from "@/services";
import { CreateColumnRequest } from "@/services/api/modules/column/types";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";

export const useCreateColumnMutation = () => {
  return useMutation({
    mutationFn: (data: CreateColumnRequest) => api.column.create(data),
    onSuccess: (column) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, column.boardId],
        (previousBoard: Board) => {
          if (!previousBoard) return undefined;

          return {
            ...previousBoard,
            columns: [...previousBoard.columns, column],
          };
        }
      );
    },
  });
};
