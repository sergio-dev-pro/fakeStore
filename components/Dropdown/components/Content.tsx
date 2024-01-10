import React, { ReactNode, useContext } from "react";
import { Context } from "../context";

type Props = {
  children: ReactNode;
  key: typeof CONTENT_KEY;
  className?: string;
};
export const CONTENT_KEY = "Content";
export const Content = ({ children, className }: Props) => {
  const { isShowing } = useContext(Context);

  if (!isShowing) return null;
  return <div className={`dropdown__content ${className}`}>{children}</div>;
};

const defaultProps = {
  key: CONTENT_KEY,
};

Content.defaultProps = defaultProps;
