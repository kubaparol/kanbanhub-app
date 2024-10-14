import { ComponentPropsWithoutRef, FC } from "react";
import { Task } from "@/services/api/modules/task/types";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui";
import { cn } from "@/utils";
import { Pencil, X } from "lucide-react";

export interface TaskCardProps extends ComponentPropsWithoutRef<"div"> {
  task: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const TaskCard: FC<TaskCardProps> = (props) => {
  const { task, onEditClick, onDeleteClick, className, ...rest } = props;

  return (
    <Card
      {...rest}
      className={cn(
        "shadow-[0_0_42px_-18px_rgba(0,0,0,0.3)] bg-yellow-100 rounded-lg",
        className
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
