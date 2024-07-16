import { Board } from "@/services/api/modules/board/types";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import dayjs from "dayjs";

export interface BoardCardProps extends ComponentPropsWithoutRef<"div"> {
  board: Board;
}

export const BoardCard: FC<BoardCardProps> = (props) => {
  const { board, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn("flex-between border p-4 rounded-lg", className)}
    >
      <header>
        <p className="text-16-regular">{board.name}</p>
      </header>

      <div className="flex flex-col items-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit name</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-gray-500 text-12-regular">
          Updated {dayjs(board.updatedAt).format("D MMMM YYYY hh:mm")}
        </p>
      </div>
    </div>
  );
};
