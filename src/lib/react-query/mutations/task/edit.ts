import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEY, queryClient } from "../..";
import { EditTaskRequest, Task } from "@/services/api/modules/task/types";
import { Board } from "@/services/api/modules/board/types";

export const useEditTaskMutation = (boardId: string) => {
  return useMutation({
    mutationFn: (data: EditTaskRequest) => api.task.edit(data),
    onMutate: (updatedTask) => {
      queryClient.setQueryData(
        [BOARD_QUERY_KEY, boardId],
        (previousBoard: Board | undefined) => {
          if (!previousBoard) return undefined;

          const previousTask = previousBoard.columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === updatedTask.id);

          if (!previousTask) {
            return previousBoard;
          }

          const isColumnChanged =
            previousTask.columnId !== updatedTask.columnId;
          const oldOrder = previousTask.order;
          const newOrder = updatedTask.order!;

          const newColumns = previousBoard.columns.map((column) => {
            if (column.id === previousTask.columnId && isColumnChanged) {
              const tasksWithoutTask = column.tasks.filter(
                (task) => task.id !== updatedTask.id
              );

              const adjustedTasks = tasksWithoutTask.map((task) => {
                if (task.order > oldOrder) {
                  return { ...task, order: task.order - 1 };
                }
                return task;
              });

              return {
                ...column,
                tasks: adjustedTasks.sort((a, b) => a.order - b.order),
              };
            } else if (column.id === updatedTask.columnId) {
              const tasksWithoutTask = column.tasks.filter(
                (task) => task.id !== updatedTask.id
              );

              let adjustedTasks = tasksWithoutTask;

              if (!isColumnChanged) {
                if (newOrder > oldOrder) {
                  adjustedTasks = adjustedTasks.map((task) => {
                    if (task.order > oldOrder && task.order <= newOrder) {
                      return { ...task, order: task.order - 1 };
                    }
                    return task;
                  });
                } else if (newOrder < oldOrder) {
                  adjustedTasks = adjustedTasks.map((task) => {
                    if (task.order >= newOrder && task.order < oldOrder) {
                      return { ...task, order: task.order + 1 };
                    }
                    return task;
                  });
                }
              }

              console.log(updatedTask);

              adjustedTasks.push(updatedTask as Task);

              return {
                ...column,
                tasks: adjustedTasks.sort((a, b) => a.order - b.order),
              };
            }

            return column;
          });

          return { ...previousBoard, columns: newColumns };
        }
      );
    },
  });
};
