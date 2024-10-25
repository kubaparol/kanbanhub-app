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
          if (!previousBoard) return undefined;

          const updatedColumn = { ...column, tasks: column.tasks || [] };

          if (updatedColumn.boardId !== previousBoard.id) {
            return {
              ...previousBoard,
              columns: previousBoard.columns.filter(
                (c) => c.id !== updatedColumn.id
              ),
            };
          }

          return {
            ...previousBoard,
            columns: previousBoard.columns.map((prevColumn) =>
              prevColumn.id === updatedColumn.id ? updatedColumn : prevColumn
            ),
          };
        }
      );
    },
  });
};
