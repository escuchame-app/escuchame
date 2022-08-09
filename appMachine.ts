import { createMachine, assign } from "xstate";
import { createModel } from "xstate/lib/model";

// Keep in sync with web ui editor @
// https://stately.ai/viz/d4f24999-f44d-4450-8e9c-ff1574a7a097

const appModel = createModel(
  {
    userId: undefined as string | undefined,
  },
  {
    events: {
      NAVIGATE_WELCOME: () => ({}),
      NAVIGATE_HOME: () => ({}),
      NAVIGATE_BACK: () => ({}),
      LOGIN_SUCCESS: () => ({}),
      LOGOUT: () => ({}),
      OPEN_LOGIN: () => ({}),
      OPEN_SETTINGS: () => ({}),
      ONBOARDING_END: () => ({}),
      REVIEW_END: () => ({}),
      REVIEW_RESUME: () => ({}),
      REVIEW_START: () => ({}),
      WELCOME_START: () => ({}),
    },
  }
);

export const appMachine = appModel.createMachine({
  id: "AppMachine",
  initial: "Init",
  context: appModel.initialContext,
  states: {
    Init: {
      on: {
        NAVIGATE_WELCOME: {
          target: "Welcome",
        },
        NAVIGATE_HOME: {
          target: "Home",
        },
      },
    },
    Welcome: {
      entry: "createNewUser",
      on: {
        OPEN_LOGIN: {
          target: "Login",
        },
        WELCOME_START: {
          target: "Onboarding",
        },
      },
    },
    Review: {
      on: {
        REVIEW_END: {
          target: "Home",
        },
        NAVIGATE_BACK: {
          target: "Home",
        },
      },
    },
    Login: {
      on: {
        LOGIN_SUCCESS: {
          target: "Home",
        },
        NAVIGATE_BACK: {
          target: "Welcome",
        },
      },
    },
    Home: {
      on: {
        REVIEW_START: {
          target: "Review",
        },
        REVIEW_RESUME: {
          target: "Review",
        },
        OPEN_SETTINGS: {
          target: "Settings",
        },
      },
    },
    Settings: {
      on: {
        NAVIGATE_BACK: {
          target: "Home",
        },
        LOGOUT: {
          target: "Welcome",
        },
      },
    },
    Onboarding: {
      on: {
        ONBOARDING_END: {
          target: "Home",
        },
      },
    },
  },
});
