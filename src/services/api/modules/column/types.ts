export interface Column {
  id: string;
  name: string;
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
export interface DeleteColumnRequest {
  id: string;
}

export interface DeleteColumnResponse {
  id: string;
  name: string;
  boardId: string;
}
/**/
