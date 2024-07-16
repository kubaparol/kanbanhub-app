export interface CreateBoardRequest {
  name: string;
}

export interface CreateBoardResponse extends CreateBoardRequest {
  id: string;
}
