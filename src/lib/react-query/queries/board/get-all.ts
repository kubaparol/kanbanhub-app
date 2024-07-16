import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const BOARDS_QUERY_KEY = "boards";

export const useGetBoardsQuery = () => {
  return useQuery({
    queryKey: [BOARDS_QUERY_KEY],
    queryFn: () => api.board.getAll(),
  });
};
