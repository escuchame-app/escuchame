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
        "review:exit": {
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
      },
    },
  },
};

export const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

export const createAppMachine = () => createMachine(config);
