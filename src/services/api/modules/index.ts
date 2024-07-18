import { BoardModule } from "./board";
import { ColumnModule } from "./column";

export * from "./board";
export * from "./column";

export class ApiService {
  board: BoardModule;
  column: ColumnModule;

  constructor() {
    this.board = new BoardModule();
    this.column = new ColumnModule();
  }
}

export const api = new ApiService();
