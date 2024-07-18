import { AbstractApiModule } from "../../helpers";
import { CreateColumnRequest, CreateColumnResponse } from "./types";

export class ColumnModule extends AbstractApiModule {
  async create(data: CreateColumnRequest) {
    return this.fetcher<CreateColumnResponse>("column", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }
}
