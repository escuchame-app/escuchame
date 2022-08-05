import { createMachine } from "xstate";

const config = {
  id: "AppMachine",
  initial: "Splash",
  states: {
    Splash: {},
    Welcome: {},
    Review: {},
    Login: {},
    Onboarding: {},
    Home: {},
  },
};

export const createAppMachine = () => createMachine(config);
