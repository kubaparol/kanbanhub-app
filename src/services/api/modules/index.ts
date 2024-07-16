import { BoardModule } from "./board";

export * from "./board";

export class ApiService {
  board: BoardModule;

  constructor() {
    this.board = new BoardModule();
  }
}

export const api = new ApiService();
