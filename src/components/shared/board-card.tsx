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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";

export interface BoardCardProps extends ComponentPropsWithoutRef<"div"> {
  board: Board;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const BoardCard: FC<BoardCardProps> = (props) => {
  const { board, onEditClick, onDeleteClick, className, ...rest } = props;

  return (
    <Card {...rest} className={cn("flex-between", className)}>
      <CardHeader>
        <Link to={AppUrls.board(board.id)} className="hover:underline">
          <CardTitle className="text-base font-normal">{board.name}</CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col items-end gap-2 pb-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEditClick}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit name</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onDeleteClick}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-gray-500 text-xs">
          Updated {dayjs(board.updatedAt).format("D MMMM YYYY hh:mm A")}
        </p>
      </CardContent>
    </Card>
  );
};
