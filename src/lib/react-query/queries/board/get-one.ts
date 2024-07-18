import { api } from "@/services";
import { GetBoardRequest } from "@/services/api/modules/board/types";
import { useQuery } from "@tanstack/react-query";

export const BOARD_QUERY_KEY = "board";

export const useGetBoardQuery = (data: GetBoardRequest) => {
  return useQuery({
    queryKey: [BOARD_QUERY_KEY, data.id],
    queryFn: () => api.board.getOne(data),
    enabled: !!data.id,
  });
};
