import React, { FC, ReactNode } from "react";

const StoreContext = React.createContext({});

/**
 * Provider that returns color object to be used in storefronts
 * If backgroundColor and textColor are supplied - use those: otherwise black and white defaults
 * this returns an object to be used as as a styles object
 */
const StoreProvider = (props) => {
  const { entityStore, holdingStore, titleStore, children } = props;

  return (
    <StoreContext.Provider value={{ entityStore, holdingStore, titleStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
