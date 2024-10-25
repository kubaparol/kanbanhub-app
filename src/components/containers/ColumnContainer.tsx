import { Column } from "@/services/api/modules/column/types";
import { Task } from "@/services/api/modules/task/types";
import { cn } from "@/utils";
import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import update from "immutability-helper";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { CreateTaskContainer } from "./CreateTaskContainer";
import { toast } from "sonner";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/constants";
import { TaskCard } from "../shared/TaskCard";

export interface ColumnContainerProps extends ComponentPropsWithoutRef<"div"> {
  boardId: string;
  column: Column;
  onEditColumnClick: () => void;
  onDeleteColumnClick: () => void;
  onEditTaskClick: (task: Task) => void;
  onDeleteTaskClick: (taskId: string) => void;
  onChangeTaskOrder: (order: number, taskId: string) => Promise<void>;
  onChangeTaskColumn: (taskId: string) => Promise<void>;
}

export const ColumnContainer: FC<ColumnContainerProps> = (props) => {
  const {
    boardId,
    column,
    onEditColumnClick,
    onDeleteColumnClick,
    onEditTaskClick,
    onDeleteTaskClick,
    onChangeTaskOrder,
    onChangeTaskColumn,
    className,
    ...rest
  } = props;

  const [tasks, setTasks] = useState<Task[]>(column.tasks);

  useEffect(() => {
    setTasks(column.tasks);
  }, [column.tasks]);

  const hoverHandler = useCallback((dragIndex: number, hoverIndex: number) => {
    setTasks((prevCards: Task[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Task],
        ],
      })
    );
  }, []);

  const dropHandler = useCallback(
    async (taskId: string) => {
      try {
        const found = tasks.findIndex((task) => task.id === taskId);

        if (found === -1) {
          return;
        }

        await onChangeTaskOrder(found + 1, taskId);
      } catch (error) {
        toast.error("Failed to change task order");
      }
    },
    [onChangeTaskOrder, tasks]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item: Task) => onChangeTaskColumn(item.id),
      canDrop: (item: Task) => item.columnId !== column.id,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      {...rest}
      ref={drop}
      className={cn(
        "relative flex flex-col gap-4 shadow-lg rounded-lg bg-teal-50 backdrop-blur-sm p-4 transition-all",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-teal-200/50 rounded-lg backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          isOver && canDrop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <PlusCircle size={40} className="text-teal-800" />
        <span className="text-teal-800 font-semibold mt-2">Drop here!</span>
      </div>

      <header className="flex-between">
        <div className="grid">
          <p className="text-lg font-semibold">{column.name}</p>
          <p className="text-sm font-semibold">{column.id}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEditColumnClick}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onDeleteColumnClick}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {tasks.length === 0 && (
        <p className="text-center italic text-gray-400 font-light text-sm py-4">
          No tasks
        </p>
      )}

      {tasks.length > 0 && (
        <ul className="grid gap-4">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              index={index}
              task={task}
              onTaskHover={hoverHandler}
              onTaskDrop={() => dropHandler(task.id)}
              onEditClick={() => onEditTaskClick(task)}
              onDeleteClick={() => onDeleteTaskClick(task.id)}
            />
          ))}
        </ul>
      )}

      <CreateTaskContainer boardId={boardId} columnId={column.id} />
    </div>
  );
};
