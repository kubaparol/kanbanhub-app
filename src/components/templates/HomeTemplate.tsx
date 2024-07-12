import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { CreateBoardContainer } from "../containers/CreateBoardContainer";

export interface HomeTemplateProps
  extends ComponentPropsWithoutRef<"section"> {}

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={cn("wrapper", className)}>
      <header className="flex-between">
        <h1 className="text-32-bold md:text-36-bold">Hello! 👋</h1>

        <CreateBoardContainer />
      </header>
    </section>
  );
};
