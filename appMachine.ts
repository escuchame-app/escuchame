import { ContextFrom, EventFrom, ActorRefFrom } from "xstate";
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
      CONTINUE: () => ({}),
      LOGIN: () => ({}),
      GET_STARTED: () => ({}),
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
              onDone: "Idle",
              onError: "Error",
            },
          },
          Idle: {},
          Error: {},
        },
        on: {
          CONTINUE: {
            target: "Home",
          },
        },
      },
      Welcome: {
        on: {
          LOGIN: {
            target: "Login",
          },
          GET_STARTED: {
            target: "Onboarding",
          },
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

export type AppContext = ContextFrom<typeof appModel>;
export type AppEvent = EventFrom<typeof appModel>;
export type AppActor = ActorRefFrom<typeof appMachine>;