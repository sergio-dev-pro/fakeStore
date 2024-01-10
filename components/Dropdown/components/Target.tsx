import React, { MouseEvent, useContext } from "react";
import { Context, ContextT } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export type Props = {
  children: React.ReactNode;
  key: typeof TARGET_KEY;
  className?: string;
};
export const TARGET_KEY = "Target";
export const Target = ({ children, className }: Props) => {
  const { toggleShowing, isShowing }: ContextT = useContext(Context);
  const handleMouseEnter = (e: any) => {
    // If it's a touch event, it shouldn't call the function that shows the modal,
    // because the click event is already called.
    const isTouchEvent = e.nativeEvent.sourceCapabilities.firesTouchEvents;
    if (isTouchEvent) return;

    toggleShowing(true);
  };

  return (
    <div
      className={`dropdown__target ${className}`}
      onClick={() => toggleShowing()}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {isShowing ? (
        <FontAwesomeIcon
          icon={faArrowDown}
          className="dropdown__target__icon"
        />
      ) : (
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="dropdown__target__icon"
        />
      )}
    </div>
  );
};

const defaultProps = {
  key: TARGET_KEY,
};

Target.defaultProps = defaultProps;
