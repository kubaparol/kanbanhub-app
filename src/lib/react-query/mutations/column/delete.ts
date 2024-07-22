import { api } from "@/services";
import { DeleteColumnRequest } from "@/services/api/modules/column/types";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";

export const useDeleteColumnMutation = () => {
  return useMutation({
    mutationFn: (data: DeleteColumnRequest) => api.column.delete(data),
    onSuccess: (column) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, column.boardId],
        (previousBoard: Board) => {
          if (!previousBoard) undefined;

          return {
            ...previousBoard,
            columns: [
              ...previousBoard.columns.filter((c) => c.id !== column.id),
            ],
          };
        }
      );
    },
  });
};
