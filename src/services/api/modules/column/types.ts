import { Task } from "../task/types";

export interface Column {
  id: string;
  name: string;
  tasks: Array<Task>;
  createdAt: string;
  updatedAt: string;
}

/* Create */
export interface CreateColumnRequest {
  name: string;
  boardId: string;
}

export interface CreateColumnResponse extends CreateColumnRequest {
  id: string;
}
/**/

/* Delete */
export interface EditColumnRequest extends Partial<CreateColumnRequest> {
  id: string;
}

export interface EditColumnResponse extends Column {
  boardId: string;
}
/**/

/* Delete */
export interface DeleteColumnRequest {
  id: string;
}

export interface DeleteColumnResponse {
  id: string;
  name: string;
  boardId: string;
}
/**/
