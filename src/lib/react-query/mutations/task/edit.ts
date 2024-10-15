import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";
import { EditTaskRequest } from "@/services/api/modules/task/types";

export const useEditTaskMutation = (boardId: string) => {
  return useMutation({
    mutationFn: (data: EditTaskRequest) => api.task.edit(data),
    onSuccess: (task) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, boardId],
        (previousBoard: Board) => {
          if (!previousBoard) return undefined;

          const updatedColumns = previousBoard.columns.map((column) => {
            if (column.id === task.columnId) {
              return {
                ...column,
                tasks: column.tasks.map((t) => (t.id === task.id ? task : t)),
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
