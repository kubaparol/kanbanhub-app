import { useGetBoardQuery } from "@/lib";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { Plus, Slash, Trash2 } from "lucide-react";
import { CreateColumnContainer } from "./CreateColumnContainer";

export interface BoardContainerProps {
  id?: string;
}

export const BoardContainer: FC<BoardContainerProps> = (props) => {
  const { id } = props;

  const { data: board, isFetching: isGettingBoard } = useGetBoardQuery({ id });

  return (
    <>
      {isGettingBoard && <Skeleton className="h-5 w-72" />}

      {!isGettingBoard && board && (
        <header className="flex-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={AppUrls.home}>Home</Link>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage>{board.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <CreateColumnContainer boardId={id} />
        </header>
      )}

      <ul className="grid grid-flow-col auto-cols-[minmax(250px,_350px)] overflow-auto gap-8 py-2 bg-white wrapper rounded-3xl">
        {board?.columns.map((column) => (
          <li key={column.id} className="grid gap-2">
            <header className="flex-between">
              <p className="text-base">{column.name}</p>

              <div className="flex-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="icon" variant="ghost">
                        <Plus className="size-5" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent sideOffset={8}>
                      <p className="text-sm">Add new task</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="size-5" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent sideOffset={8}>
                      <p className="text-sm">Delete column</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </header>

            <div className="p-4 border rounded-md shadow-sm min-h-72 flex flex-col">
              <div className="grid items-center flex-grow">
                <p className="text-sm text-gray-400 font-light text-center">
                  No tasks
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
