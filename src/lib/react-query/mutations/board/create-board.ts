import { api } from "@/services";
import { CreateBoardRequest } from "@/services/api/modules/board/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateBoardMutation = () => {
  return useMutation({
    mutationFn: (data: CreateBoardRequest) => api.board.create(data),
  });
};
