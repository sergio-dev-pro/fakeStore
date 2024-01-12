import React, { InputHTMLAttributes } from "react";
import "./input.scss";

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, type = "text", ...props }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input aria-label={label} type={type} {...props} />
    </div>
  );
};
