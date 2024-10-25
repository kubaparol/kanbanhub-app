import { Board } from "@/services/api/modules/board/types";
import { cn } from "@/utils";
import {
  ComponentPropsWithoutRef,
  FC,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";

export interface BoardCardProps extends ComponentPropsWithoutRef<"div"> {
  board: Board;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const BoardCard: FC<BoardCardProps> = (props) => {
  const { board, onEditClick, onDeleteClick, className, ...rest } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownMenuClickHandler = useCallback(
    (evt: MouseEvent<HTMLDivElement> | undefined, cb: () => void) => {
      evt?.preventDefault();

      setIsDropdownOpen(false);

      cb();
    },
    []
  );

  return (
    <Card
      {...rest}
      className={cn(
        "shadow-[0_0_42px_-18px_rgba(0,0,0,0.3)] flex flex-col justify-between h-full border-none rounded-3xl transition-all duration-300 ease-out hover:shadow-[0_0_42px_-18px_rgba(0,0,0,0.05)] hover:bg-secondary",
        className
      )}
    >
      <CardHeader className="">
        <div className="flex-between">
          <CardTitle className="text-base font-semibold">
            {board.name}
          </CardTitle>

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
                <span>Edit</span>
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

        <CardDescription className="font-light line-clamp-3">
          {board.description}
        </CardDescription>
      </CardHeader>

      {/* <CardContent>
        <div className="grid gap-1">
          <p className="text-end text-sm text-gray-400">59%</p>
          <Progress value={59} className="h-2" />
        </div>
      </CardContent> */}

      <CardFooter className="">
        <p className="text-gray-500 text-xs ml-auto">
          Updated {dayjs(board.updatedAt).format("D MMMM YYYY hh:mm A")}
        </p>
      </CardFooter>
    </Card>
  );
};
