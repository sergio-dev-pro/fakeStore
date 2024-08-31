import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.scss";

export type buttonStyles =
  | "primary"
  | "secondary"
  | "secondary-blue"
  | "bluish-green-secondary";
type Props = {
  children: ReactNode;
  style?: buttonStyles;
  widthFull?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  style = "primary",
  widthFull,
  ...props
}: Props) => {
  return (
    <button
      className={`${className} ${
        "button--" + style
      } button text-large padding-small ${widthFull && "button--width-full"}`}
      {...props}
    >
      {children}
    </button>
  );
};
