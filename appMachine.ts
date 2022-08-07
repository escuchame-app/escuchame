import { createContext } from "react";
import { ActorRef, createMachine } from "xstate";

const config = {
  id: "AppMachine",
  initial: "Init",
  states: {
    Init: {
      on: {
        "navigate:welcome": {
          target: "Welcome",
        },
        "navigate:home": {
          target: "Home",
        },
        "review:resume": {
          target: "ReviewSession",
        },
      },
    },
    Welcome: {
      on: {
        "navigate:login": {
          target: "Login",
        },
        continue: {
          target: "Home",
        },
      },
    },
    ReviewSession: {
      on: {
        "review:exit": {
          target: "Home",
        },
      },
    },
    Login: {
      on: {
        "navigate:home": {
          target: "Home",
        },
        back: {
          target: "Welcome",
        },
      },
    },
    Home: {
      on: {
        "review:start": {
          target: "ReviewSession",
        },
        "review:resume": {
          target: "ReviewSession",
        },
        "navigate:settings": {
          target: "Settings",
        },
      },
    },
    Settings: {},
  },
};

export const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

export const createAppMachine = () => createMachine(config);
