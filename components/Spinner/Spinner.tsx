import React from "react";
import "./spinner.scss";
type Props = {
  isVisible: boolean;
  className?: string;
};
export const Spinner = ({ isVisible, className }: Props) => {
  if (!isVisible) return null;
  return <div className={"spinner " + className}></div>;
};
