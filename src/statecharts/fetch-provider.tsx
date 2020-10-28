import { useMachine } from "@xstate/react";
import React, { createContext, ReactNode } from "react";
import { fetchMachine } from "./fetch-state-chart";
import { FetchCurrent, FetchSend } from "./fetch-types";

export const FetchSharedContext = createContext<[FetchCurrent, FetchSend]>(
  undefined!
);

interface FetchProviderProps {
  children: ReactNode;
}

export const FetchProvider: React.FC<FetchProviderProps> = ({ children }) => {
  const [current, send] = useMachine(fetchMachine);

  return (
    <FetchSharedContext.Provider value={[current, send]}>
      {children}
    </FetchSharedContext.Provider>
  );
};
