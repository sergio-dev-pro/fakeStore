import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.scss";

export type buttonStyles = "primary" | "secondary" | "secondary-blue";
type Props = {
  children: ReactNode;
  style?: buttonStyles;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  style = "primary",
  ...props
}: Props) => {
  return (
    <button className={`${className} ${"button--" + style} button`} {...props}>
      {children}
    </button>
  );
};
