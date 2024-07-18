import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { BoardContainer } from "../containers/BoardContainer";

export interface BoardTemplateProps
  extends ComponentPropsWithoutRef<"section"> {
  id?: string;
}

export const BoardTemplate: FC<BoardTemplateProps> = (props) => {
  const { id, className, ...rest } = props;

  return (
    <section {...rest} className={cn("wrapper grid gap-14", className)}>
      <BoardContainer id={id} />
    </section>
  );
};
