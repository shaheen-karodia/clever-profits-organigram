import React, { FC, ReactNode } from "react";

const TitleContext = React.createContext({});

const TitleProvider = (props) => {
  const { titleStore, children } = props;

  return (
    <TitleContext.Provider value={{ titleStore }}>
      {children}
    </TitleContext.Provider>
  );
};

export { TitleProvider, TitleContext };
