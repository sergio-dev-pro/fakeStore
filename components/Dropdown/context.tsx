import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

export type ContextT = {
  isShowing: boolean;
  toggleShowing: (isForShow?: boolean) => void;
};

const contextInitValue: ContextT = {
  isShowing: false,
  toggleShowing: () => null,
};

export const Context = createContext<ContextT>(contextInitValue);

export const ContextProvider = ({ children }: Props) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggleShowing = (isForShow?: boolean) => {
    console.log("toggleShowing");
    setIsShowing((state) =>
      typeof isForShow == "boolean" ? isForShow : !state
    );
  };
  console.log("context");
  return (
    <Context.Provider value={{ isShowing, toggleShowing }}>
      {children}
    </Context.Provider>
  );
};
