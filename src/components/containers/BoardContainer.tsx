import { useGetBoardQuery } from "@/lib";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Skeleton,
} from "../ui";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { Slash } from "lucide-react";
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

      <ul className="grid grid-flow-col auto-cols-[minmax(250px,_350px)] overflow-auto gap-6">
        {board?.columns.map((column) => (
          <li key={column.id} className="border-2 rounded-md">
            <header className="border-b-2 p-3">
              <p className="text-center text-sm">{column.name}</p>
            </header>

            <div className="p-4">...</div>
          </li>
        ))}
      </ul>
    </>
  );
};
