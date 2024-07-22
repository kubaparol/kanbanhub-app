import { api } from "@/services";
import { EditColumnRequest } from "@/services/api/modules/column/types";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";

export const useEditColumnMutation = () => {
  return useMutation({
    mutationFn: (data: EditColumnRequest) => api.column.edit(data),
    onSuccess: (column) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, column.boardId],
        (previousBoard: Board) => {
          if (!previousBoard) undefined;

          return {
            ...previousBoard,
            columns: previousBoard.columns.map((prevColumn) =>
              prevColumn.id === column.id ? column : prevColumn
            ),
          };
        }
      );
    },
  });
};
