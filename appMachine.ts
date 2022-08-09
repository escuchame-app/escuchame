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
      LOGOUT: () => ({}),
      OPEN_LOGIN: () => ({}),
      OPEN_SETTINGS: () => ({}),
      REVIEW_RESUME: () => ({}),
      REVIEW_START: () => ({}),
      REVIEW_PAUSE: () => ({}),
      WELCOME_START: () => ({}),
    },
  }
);

export const appMachine = appModel.createMachine(
  {
    id: "AppMachine",
    initial: "Init",
    context: appModel.initialContext,
    states: {
      Init: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "bootstrapApp",
              onDone: "Success",
              onError: "Failure",
            },
          },
          Success: {
            type: "final" as const,
          },
          Failure: {
            type: "final" as const,
          },
        },
        onDone: [
          {
            target: "Home",
            cond: "isLoggedIn",
          },
          {
            target: "Welcome",
          },
        ],
      },
      Welcome: {
        onDone: {
          target: "Onboarding",
        },
        on: {
          OPEN_LOGIN: {
            target: "Login",
          },
        },
      },
      Review: {
        onDone: {
          target: "Home",
        },
        on: {
          REVIEW_PAUSE: {
            target: "Home",
          },
        },
      },
      Login: {
        onDone: [
          {
            target: "Home",
            cond: "isLoggedIn",
          },
          {
            target: "Welcome",
          },
        ],
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
        onDone: {
          target: "Home",
        },
        states: {
          Idle: {},
          Loading: {},
        },
        on: {
          LOGOUT: {
            target: "Welcome",
          },
        },
      },
      Onboarding: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "createNewUser",
              onDone: "Success",
              onError: "Failure",
            },
          },
          Success: {
            type: "final" as const,
          },
          Failure: {
            type: "final" as const,
          },
        },

        onDone: {
          target: "Home",
        },
      },
    },
  },
  {
    guards: {
      isLoggedIn: (context) => {
        return !!context.userId;
      },
    },
  }
);
