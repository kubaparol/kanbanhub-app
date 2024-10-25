import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface LogoProps extends ComponentPropsWithoutRef<"div"> {}

export const Logo: FC<LogoProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={cn("flex items-center gap-3", className)}>
      <img
        src="public/assets/images/logo.png"
        alt="KanbanHub Logo"
        className="max-w-36"
      />
    </div>
  );
};
