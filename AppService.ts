import { createContext } from "react";
import { ActorRef } from "xstate";

export const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);
