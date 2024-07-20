import { Board } from "@/services/api/modules/board/types";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC, MouseEvent, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Progress,
  CardFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui";
import { ClipboardList, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";

export interface BoardCardProps extends ComponentPropsWithoutRef<"div"> {
  board: Board;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const BoardCard: FC<BoardCardProps> = (props) => {
  const { board, onEditClick, onDeleteClick, className, ...rest } = props;

  const dropdownMenuClickHandler = useCallback(
    (evt: MouseEvent<HTMLDivElement> | undefined, cb: () => void) => {
      evt?.preventDefault();

      cb();
    },
    []
  );

  return (
    <Card
      {...rest}
      className={cn(
        "shadow-[0_0_40px_-16px_rgba(0,0,0,0.2)] hover:bg-blue-50/40 transition-colors border-none rounded-3xl",
        className
      )}
    >
      <CardHeader className="">
        <div className="flex-between">
          <CardTitle className="text-base font-semibold">
            {board.name}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal size={20} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(evt) => dropdownMenuClickHandler(evt, onEditClick)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit name</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(evt) => dropdownMenuClickHandler(evt, onDeleteClick)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardDescription className="font-light line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          optio, esse molestias rerum sint blanditiis, nesciunt numquam
          aspernatur velit veritatis sequi ut fugiat iure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-1">
          <p className="text-end text-sm text-gray-400">59%</p>
          <Progress value={59} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="flex-between">
        <div className="flex-center gap-1 text-gray-600">
          <ClipboardList size={18} />
          <p className="text-sm">10</p>
        </div>

        <p className="text-gray-500 text-xs">
          Updated {dayjs(board.updatedAt).format("D MMMM YYYY hh:mm A")}
        </p>
      </CardFooter>
    </Card>
  );
};
