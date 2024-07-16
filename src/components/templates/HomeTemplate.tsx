import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { CreateBoardContainer } from "../containers/CreateBoardContainer";
import { BoardListContainer } from "../containers/BoardListContainer";

export interface HomeTemplateProps
  extends ComponentPropsWithoutRef<"section"> {}

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={cn("wrapper grid gap-14", className)}>
      <header className="flex-between">
        <h1 className="text-4xl font-bold">Hello! 👋</h1>

        <CreateBoardContainer />
      </header>

      <BoardListContainer />
    </section>
  );
};
