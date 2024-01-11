import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.scss";

type Props = {
  children: ReactNode;
  style?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  style = "primary",
  ...props
}: Props) => {
  const styleClassName = `button--${style === "primary" ? style : "secondary"}`;
  return (
    <button className={`button ${styleClassName} ${className}`} {...props}>
      {children}
    </button>
  );
};
