import { createContext, useContext, type ReactNode } from "react";

type LaunchState = {
  launching: boolean;
  ready: boolean;
};

const LaunchContext = createContext<LaunchState>({
  launching: false,
  ready: true,
});

export function LaunchProvider({ children }: { children: ReactNode }) {
  return (
    <LaunchContext.Provider value={{ launching: false, ready: true }}>
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  return useContext(LaunchContext);
}
