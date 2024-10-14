import { AbstractApiModule } from "../../helpers";
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  DeleteTaskResponse,
  EditTaskRequest,
  EditTaskResponse,
} from "./types";

export class TaskModule extends AbstractApiModule {
  async create(data: CreateTaskRequest) {
    return this.fetcher<CreateTaskRequest>("task", {
      method: "POST",
      data,
    }).then((res) => res.data);
  }

  async edit(data: EditTaskRequest) {
    const { id, ...rest } = data;

    return this.fetcher<EditTaskResponse>(`column/${id}`, {
      method: "PATCH",
      data: rest,
    }).then((res) => res.data);
  }

  async delete(data: DeleteTaskRequest) {
    const { id, ...rest } = data;

    return this.fetcher<DeleteTaskResponse>(`column/${id}`, {
      method: "DELETE",
      data: rest,
    }).then((res) => res.data);
  }
}
