import { ItemTypes } from "@/constants";
import { Task } from "@/services/api/modules/task/types";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import { Pencil, X } from "lucide-react";
import { cn } from "@/utils";

export interface TaskCardProps extends ComponentPropsWithoutRef<"div"> {
  task: Task;
  index: number;
  onTaskHover: (dragIndex: number, hoverIndex: number) => void;
  onTaskDrop: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

interface DragItem extends Task {
  index: number;
}

export const TaskCard: FC<TaskCardProps> = (props) => {
  const {
    task,
    index,
    onTaskHover,
    onTaskDrop,
    onEditClick,
    onDeleteClick,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: () => onTaskDrop(),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onTaskHover(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { ...task, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Card
      {...rest}
      ref={ref}
      data-handler-id={handlerId}
      className={cn(
        "bg-yellow-100 rounded-lg transition-all cursor-move h-fit",
        isDragging && "opacity-30"
      )}
    >
      <CardHeader className="p-3">
        <div className="flex-between">
          <CardTitle className="text-base font-semibold">{task.name}</CardTitle>

          <div className="flex items-center gap-1">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={onEditClick}
                  >
                    <Pencil className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={onDeleteClick}
                  >
                    <X className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
