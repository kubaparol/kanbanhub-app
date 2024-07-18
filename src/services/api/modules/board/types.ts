export interface Board {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/* Create */
export interface CreateBoardRequest {
  name: string;
}

export interface CreateBoardResponse extends CreateBoardRequest {
  id: string;
}
/**/

/* Get all */
export interface GetBoardsRequest {}

export interface GetBoardsResponse extends Array<Board> {}
/**/

/* Get one */
export interface GetBoardRequest {
  id?: string;
}

export interface GetBoardResponse extends Board {
  columns: Array<unknown>;
}
/**/

/* Edit */
export interface EditBoardRequest extends Partial<CreateBoardRequest> {
  id: string;
}

export interface EditBoardResponse extends Board {}
/**/

/* Delete */
export interface DeleteBoardRequest {
  id: string;
}

export interface DeleteBoardResponse extends Board {}
/**/
