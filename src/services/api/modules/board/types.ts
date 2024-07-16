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
