import React, { ReactElement, ReactNode, isValidElement } from "react";
import { TARGET_KEY, Target } from "./components/Target";
import { CONTENT_KEY, Content } from "./components/Content";
import { Context, ContextProvider, ContextT } from "./context";
import "./dropdown.scss";
type Props = {
  children: ReactElement[];
  className?: string;
};
export const DROPDOWN_MUST_HAVE_TWO_CHILDREN =
  "Dropdown deve receber Dropdown.Target and Dropdown.Content";
const isTargetComponent = (firstChild: ReactElement) => {
  return firstChild.props?.key === TARGET_KEY;
};
const isContentComponent = (secondChild: ReactElement) => {
  return secondChild.props?.key === CONTENT_KEY;
};

export const Dropdown = ({ children, className }: Props) => {
  if (children.length !== 2) throw Error(DROPDOWN_MUST_HAVE_TWO_CHILDREN);
  if (isValidElement(children[0]) && !isTargetComponent(children[0]))
    throw Error(DROPDOWN_MUST_HAVE_TWO_CHILDREN);
  if (isValidElement(children[1]) && !isContentComponent(children[1]))
    throw Error(DROPDOWN_MUST_HAVE_TWO_CHILDREN);

  return (
    <ContextProvider>
      <Context.Consumer>
        {(value: ContextT) => (
          <div
            data-testid="dropdown"
            className={`dropdown ${className}`}
            onMouseLeave={() => value.toggleShowing(false)}
          >
            {children}
          </div>
        )}
      </Context.Consumer>
    </ContextProvider>
  );
};

Dropdown.Target = Target;
Dropdown.Content = Content;
