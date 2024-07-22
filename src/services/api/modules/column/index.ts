import { AbstractApiModule } from "../../helpers";
import {
  CreateColumnRequest,
  CreateColumnResponse,
  DeleteColumnRequest,
  DeleteColumnResponse,
} from "./types";

export class ColumnModule extends AbstractApiModule {
  async create(data: CreateColumnRequest) {
    return this.fetcher<CreateColumnResponse>("column", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }

  async delete(data: DeleteColumnRequest) {
    const { id, ...rest } = data;

    return this.fetcher<DeleteColumnResponse>(`column/${id}`, {
      method: "DELETE",
      data: rest,
    }).then((res) => res.data);
  }
}
