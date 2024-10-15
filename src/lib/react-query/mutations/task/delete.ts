import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";
import { DeleteTaskRequest } from "@/services/api/modules/task/types";

export const useDeleteTaskMutation = (boardId: string) => {
  return useMutation({
    mutationFn: (data: DeleteTaskRequest) => api.task.delete(data),
    onSuccess: (task) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, boardId],
        (previousBoard: Board) => {
          if (!previousBoard) return undefined;

          const updatedColumns = previousBoard.columns.map((column) => {
            if (column.id === task.columnId) {
              return {
                ...column,
                tasks: column.tasks.filter((t) => t.id !== task.id),
              };
            }
            return column;
          });

          return {
            ...previousBoard,
            columns: updatedColumns,
          };
        }
      );
    },
  });
};
