import { api } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BOARD_QUERY_KEY } from "../..";
import { EditTaskRequest } from "@/services/api/modules/task/types";

export const useEditTaskMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditTaskRequest) => api.task.edit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOARD_QUERY_KEY, boardId] });

      // This is an example of how you can update the cache manually

      // queryClient.setQueryData(
      //   [BOARD_QUERY_KEY, boardId],
      //   (previousBoard: Board) => {
      //     if (!previousBoard) return undefined;

      //     const updatedColumns = previousBoard.columns.map((column) => {
      //       const tasks = column.tasks;
      //       const foundTask = tasks.find((t) => t.id === task.id);

      //       const indexTask = tasks.findIndex((t) => t.id === task.id);

      //       const updatedTasks = foundTask
      //         ? column.tasks.map((t) => (t.id === task.id ? task : t))
      //         : [...column.tasks, task];

      //       if (column.id === task.columnId) {
      //         for (let i = 0; i < updatedTasks.length; i++) {
      //           if (i >= indexTask) {
      //             updatedTasks[i].order = updatedTasks[i].order + 1;
      //           }
      //         }

      //         console.log(updatedTasks);

      //         return {
      //           ...column,
      //           tasks: foundTask
      //             ? column.tasks.map((t) => (t.id === task.id ? task : t))
      //             : [...column.tasks, task],
      //         };
      //       }

      //       if (foundTask) {
      //         return {
      //           ...column,
      //           tasks: column.tasks.filter((t) => t.id !== foundTask.id),
      //         };
      //       }

      //       return column;
      //     });

      //     return {
      //       ...previousBoard,
      //       columns: updatedColumns,
      //     };
      //   }
      // );
    },
  });
};
