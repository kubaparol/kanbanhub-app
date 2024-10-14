export interface Task {
  id: string;
  name: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}

/* Create */
export interface CreateTaskRequest {
  name: string;
  columnId: string;
}

export interface CreateTaskResponse extends CreateTaskRequest {
  id: string;
}
/**/

/* Delete */
export interface EditTaskRequest extends Partial<CreateTaskRequest> {
  id: string;
}

export interface EditTaskResponse extends Task {
  columnId: string;
}
/**/

/* Delete */
export interface DeleteTaskRequest {
  id: string;
}

export interface DeleteTaskResponse {
  id: string;
  name: string;
  columnId: string;
}
/**/
