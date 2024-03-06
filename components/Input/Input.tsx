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
    <div className={containerClassName + " input-wrapper text-large"}>
      <label className="input-wrapper__label text-large">{label}</label>
      <input
        className="input-wrapper__input text-medium"
        aria-label={label}
        type={type}
        {...props}
      />
      {errorMessage.length > 0 && (
        <span className="input-wrapper__span text-small">{errorMessage}</span>
      )}
    </div>
  );
};
