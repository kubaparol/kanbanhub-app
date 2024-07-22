import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { BoardListContainer } from "../containers/BoardListContainer";
import { CreateBoardContainer } from "../containers/CreateBoardContainer";

export interface HomeTemplateProps
  extends ComponentPropsWithoutRef<"section"> {}

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <section
      {...rest}
      className={cn("wrapper rounded-3xl grid gap-6", className)}
    >
      <header className="flex-between p-2">
        <h1 className="text-3xl font-semibold">Boards</h1>

        <CreateBoardContainer />
      </header>

      <BoardListContainer />
    </section>
  );
};
