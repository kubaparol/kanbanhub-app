import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { Board } from "@/services/api/modules/board/types";
import { CreateTaskRequest } from "@/services/api/modules/task/types";

export const useCreateTaskMutation = (boardId: string) => {
  return useMutation({
    mutationFn: (data: CreateTaskRequest) => api.task.create(data),
    onSuccess: (task) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, boardId],
        (previousBoard: Board) => {
          if (!previousBoard) return undefined;

          const updatedColumns = previousBoard.columns.map((column) => {
            if (column.id === task.columnId) {
              return {
                ...column,
                tasks: [...column.tasks, task],
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
