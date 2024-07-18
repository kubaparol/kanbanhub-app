import { api } from "@/services";
import { GetBoardsRequest } from "@/services/api/modules/board/types";
import { useQuery } from "@tanstack/react-query";

export const BOARDS_QUERY_KEY = "boards";

export const useGetBoardsQuery = () => {
  return useQuery({
    queryKey: [BOARDS_QUERY_KEY],
    queryFn: (data: GetBoardsRequest) => api.board.getAll(data),
  });
};
