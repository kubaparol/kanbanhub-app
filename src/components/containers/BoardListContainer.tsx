import { useGetBoardsQuery } from "@/lib/react-query/queries";
import { FC } from "react";
import { BoardCard } from "../shared/board-card";
import { Skeleton } from "../ui/skeleton";

export interface BoardListContainerProps {}

export const BoardListContainer: FC<BoardListContainerProps> = () => {
  const { data: boards, isFetching: isBoardsLoading } = useGetBoardsQuery();

  return (
    <ul className="grid gap-4">
      {isBoardsLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <Skeleton className="h-[90px]" />
          </li>
        ))}

      {!isBoardsLoading &&
        boards?.map((board) => (
          <li key={board.id}>
            <BoardCard board={board} />
          </li>
        ))}
    </ul>
  );
};
