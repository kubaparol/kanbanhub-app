import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Logo } from "./Logo";
import { AppUrls } from "@/router/urls";
import { Link } from "react-router-dom";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <header {...rest} className={cn("wrapper", className)}>
      <Link to={AppUrls.home}>
        <Logo />
      </Link>
    </header>
  );
};
