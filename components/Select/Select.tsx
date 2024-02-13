import React, { FC, OptionHTMLAttributes, SelectHTMLAttributes } from "react";

type Props = {
  label: string;
  children: ReturnType<typeof Option>;
} & SelectHTMLAttributes<HTMLSelectElement>;

type SelectT = {
  Option: typeof Option;
} & FC<Props>;

export const Select: SelectT = ({ label, children, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <select name={label} {...props}>
        {children}
      </select>
    </div>
  );
};

const Option = (props: OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option {...props} />;
};

Select.Option = Option;
