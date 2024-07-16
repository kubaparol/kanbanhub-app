import { AbstractApiModule } from "../../helpers";
import {
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardsResponse,
} from "./types";

export class BoardModule extends AbstractApiModule {
  async create(data: CreateBoardRequest) {
    return this.fetcher<CreateBoardResponse>("board", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }

  async getAll() {
    return this.fetcher<GetBoardsResponse>("board", {
      method: "GET",
    }).then((res) => res.data);
  }
}
