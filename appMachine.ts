import { createContext } from "react";
import { ActorRef, createMachine } from "xstate";

// Manually kept in sync with web ui editor:
// https://stately.ai/registry/editor/f0118688-d1a3-495f-9688-0a7ce77ea106

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
      },
    },
    Welcome: {
      on: {
        "open:login": {
          target: "Login",
        },
        "welcome:start": {
          target: "Home",
        },
      },
    },
    Review: {
      on: {
        "review:end": {
          target: "Home",
        },
        "navigate:back": {
          target: "Home",
        },
      },
    },
    Login: {
      on: {
        "login:success": {
          target: "Home",
        },
        "navigate:back": {
          target: "Welcome",
        },
      },
    },
    Home: {
      on: {
        "review:start": {
          target: "Review",
        },
        "review:resume": {
          target: "Review",
        },
        "open:settings": {
          target: "Settings",
        },
      },
    },
    Settings: {
      on: {
        "navigate:back": {
          target: "Home",
        },
        logout: {
          target: "Welcome",
        },
      },
    },
  },
};

export const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

export const createAppMachine = () => createMachine(config);
