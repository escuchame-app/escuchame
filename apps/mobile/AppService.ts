import { createContext } from "react";
import { AppActor } from "./appMachine";

export const AppServiceContext = createContext<AppActor>(
  {} as AppActor
);
