import { cn } from "@/utils";
import { CircuitBoard } from "lucide-react";
import { ComponentPropsWithoutRef, FC } from "react";

export interface LogoProps extends ComponentPropsWithoutRef<"div"> {}

export const Logo: FC<LogoProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={cn("flex items-center gap-3", className)}>
      <CircuitBoard size={32} />
      <p className="font-bold">KanbanHub</p>
    </div>
  );
};
