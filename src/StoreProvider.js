import React, { FC, ReactNode } from "react";

const StoreContext = React.createContext({});

const StoreProvider = (props) => {
  const { entityStore, titleStore, children } = props;

  return (
    <StoreContext.Provider value={{ entityStore, titleStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
