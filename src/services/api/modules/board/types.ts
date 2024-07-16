/* Create */
export interface CreateBoardRequest {
  name: string;
}

export interface CreateBoardResponse extends CreateBoardRequest {
  id: string;
}
/**/

/* Get all */
export interface GetBoardsResponse {}

export interface Board {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBoardsResponse extends Array<Board> {}
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
