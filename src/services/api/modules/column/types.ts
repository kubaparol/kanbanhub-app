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
