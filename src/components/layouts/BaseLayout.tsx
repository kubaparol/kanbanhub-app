import { FC, PropsWithChildren } from "react";
import { Footer } from "../base/Footer";

export interface HeaderProps extends PropsWithChildren {}

export const Header: FC<HeaderProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
