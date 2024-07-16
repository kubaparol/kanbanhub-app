import { AbstractApiModule } from "../../helpers";
import { CreateBoardRequest, CreateBoardResponse } from "./types";

export class BoardModule extends AbstractApiModule {
  async create(data: CreateBoardRequest) {
    return this.fetcher<CreateBoardResponse>("board", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }
}
