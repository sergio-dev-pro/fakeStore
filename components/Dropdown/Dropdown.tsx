'use client'
import React, { ReactNode, useState } from "react";
import { Button, buttonSize, buttonStyles } from "../Button";
import "./dropdown.scss";

type Props = {
  title: string;
  children: ReactNode;
  buttonStyle?: buttonStyles;
  buttonClassName?: string;
  buttonSize?: buttonSize
};

export const Dropdown = ({
  title,
  children,
  buttonStyle = "secondary",
  buttonClassName,
  buttonSize = 'medium'
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((s) => !s);
  const handleMouseEnter = (e: any) => {
    // If it's a touch event, it shouldn't call the function that shows the modal,
    // because the click event is already called.
    const isTouchEvent = e.nativeEvent.sourceCapabilities.firesTouchEvents;
    if (isTouchEvent) return;

    setIsVisible(true);
  };
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      data-testid="container"
      className="dropdown"
      onMouseLeave={handleMouseLeave}
    >
      <Button
        onClick={toggleVisibility}
        onMouseEnter={handleMouseEnter}
        className={buttonClassName + " dropdown__button"}
        style={buttonStyle}
        size={buttonSize}
      >
        {title}
      </Button>
      {isVisible && <div className="dropdown__visible--align-left"><div className="dropdown__visible">{children}</div></div>}
    </div>
  );
};
