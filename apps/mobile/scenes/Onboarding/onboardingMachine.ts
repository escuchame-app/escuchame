import { createContext } from "react";
import { ActorRef, createMachine } from "xstate";

// https://stately.ai/registry/editor/33363de5-14f6-436b-867d-7bb8cf64b89f

const config = {
  id: "OnboardingMachine",
  initial: "Idle",
  states: {
    Loading: {
      on: {
        "create:user:success": {
          target: "Ready",
        },
        "create:user:failure": {
          target: "Error",
        },
      },
    },
    Ready: {
      type: "final" as const,
    },
    Error: {
      type: "final" as const,
    },
    Idle: {
      on: {
        "create:user": {
          actions: "createNewUser",
          target: "Loading",
        },
      },
    },
  },
};

export const OnboardingServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

export const createOnboardingMachine = () => createMachine(config);
