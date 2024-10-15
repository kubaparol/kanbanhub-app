import { BoardModule } from "./board";
import { ColumnModule } from "./column";
import { TaskModule } from "./task";

export * from "./board";
export * from "./column";

export class ApiService {
  board: BoardModule;
  column: ColumnModule;
  task: TaskModule;

  constructor() {
    this.board = new BoardModule();
    this.column = new ColumnModule();
    this.task = new TaskModule();
  }
}

export const api = new ApiService();
