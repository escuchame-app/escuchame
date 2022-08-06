import { createMachine } from "xstate";

const config = {
  id: "AppMachine",
  initial: "Splash",
  states: {
    Splash: {
      on: {
        "navigate:welcome": {
          target: "Welcome",
        },
        "navigate:home": {
          target: "Home",
        },
        "session:resume": {
          target: "Review",
        },
      },
    },
    Welcome: {
      on: {
        "navigate:onboarding": {
          target: "Onboarding",
        },
        "navigate:login": {
          target: "Login",
        },
      },
    },
    Review: {},
    Login: {
      on: {
        "navigate:home": {
          target: "Home",
        },
        "navigate:onboarding": {
          target: "Onboarding",
        },
      },
    },
    Onboarding: {},
    Home: {
      on: {
        "session:start": {
          target: "Review",
        },
        "session:resume": {
          target: "Review",
        },
      },
    },
  },
};

export const createAppMachine = () => createMachine(config);
