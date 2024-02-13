import React, { InputHTMLAttributes } from "react";
import "./input.scss";

type Props = {
  label: string;
  errorMessage?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  type = "text",
  errorMessage = "",
  containerClassName,
  ...props
}: Props) => {
  return (
    <div className={containerClassName + " input-wrapper"}>
      <label className="input-wrapper__label">{label}</label>
      <input
        className="input-wrapper__input"
        aria-label={label}
        type={type}
        {...props}
      />
      {errorMessage.length > 0 && (
        <span className="input-wrapper__span">{errorMessage}</span>
      )}
    </div>
  );
};
