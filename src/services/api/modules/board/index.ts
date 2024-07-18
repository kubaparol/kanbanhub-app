import { AbstractApiModule } from "../../helpers";
import {
  CreateBoardRequest,
  CreateBoardResponse,
  DeleteBoardRequest,
  DeleteBoardResponse,
  EditBoardRequest,
  GetBoardRequest,
  GetBoardResponse,
  GetBoardsRequest,
  GetBoardsResponse,
} from "./types";

export class BoardModule extends AbstractApiModule {
  async create(data: CreateBoardRequest) {
    return this.fetcher<CreateBoardResponse>("board", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }

  async getAll(data: GetBoardsRequest) {
    return this.fetcher<GetBoardsResponse>("board", {
      method: "GET",
      data,
    }).then((res) => res.data);
  }

  async getOne(data: GetBoardRequest) {
    const { id, ...rest } = data;

    return this.fetcher<GetBoardResponse>(`board/${id}`, {
      method: "GET",
      data: { ...rest },
    }).then((res) => res.data);
  }

  async delete(data: DeleteBoardRequest) {
    const { id } = data;

    return this.fetcher<DeleteBoardResponse>(`board/${id}`, {
      method: "DELETE",
    }).then((res) => res.data);
  }

  async edit(data: EditBoardRequest) {
    const { id, ...rest } = data;

    return this.fetcher<EditBoardRequest>(`board/${id}`, {
      method: "PATCH",
      data: rest,
    }).then((res) => res.data);
  }
}
