import { assign, ContextFrom, EventFrom, ActorRefFrom } from "xstate";
import { createModel } from "xstate/lib/model";

// Keep in sync with web ui editor @
// https://stately.ai/viz/d4f24999-f44d-4450-8e9c-ff1574a7a097

export const appModel = createModel(
  {
    userId: undefined as string | undefined,
  },
  {
    events: {
      // Welcome Screen
      OPEN_LOGIN: () => ({}),

      // Onboarding Screen
      CONTINUE: () => ({}),

      // Home Screen
      START_REVIEW: () => ({}),
      OPEN_SETTINGS: () => ({}),

      // Login Screen
      SUBMIT_LOGIN: ({ email }: { email: string }) => ({ email }),

      // Settings Screen
      LOGOUT: () => ({}),

      // Review Screen
      PAUSE_REVIEW: () => ({}),

      // Shared
      START: () => ({}),
      BACK: () => ({}),
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
              onError: "Error",
            },
          },
          Success: {
            type: "final" as const,
          },
          Error: {
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
          PAUSE_REVIEW: {
            target: "Home",
          },
        },
      },
      Login: {
        initial: "Idle",
        states: {
          Idle: {
            on: {
              SUBMIT_LOGIN: {
                target: "Loading",
              },
              BACK: {
                target: "Done",
              },
            },
          },
          Loading: {
            invoke: {
              src: "loginUser",
              onDone: {
                target: "Done",
                actions: "assignUserId",
              },
              onError: "Error",
            },
          },
          Error: {},
          Done: {
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
      Home: {
        on: {
          START_REVIEW: {
            target: "Review",
          },
          OPEN_SETTINGS: {
            target: "Settings",
          },
        },
      },
      Settings: {
        initial: "Idle",
        onDone: {
          target: "Home",
        },
        states: {
          Idle: {
            on: {
              BACK: "Done",
            },
          },
          Done: {
            type: "final" as const,
          },
        },
        on: {
          LOGOUT: {
            target: "Welcome",
            actions: "clearUserId",
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
              onError: "Error",
            },
          },
          Error: {},
          Success: {
            always: {
              target: "Idle",
            },
          },
          Idle: {
            on: {
              CONTINUE: {
                target: "Complete",
              },
            },
          },
          Complete: {
            type: "final" as const,
          },
        },
        onDone: {
          target: "Home",
        },
      },
      Welcome: {
        initial: "Idle",
        states: {
          Idle: {
            on: {
              START: {
                target: "Complete",
              },
            },
          },
          Complete: {
            type: "final" as const,
          },
        },
        on: {
          OPEN_LOGIN: {
            target: "Login",
          },
        },
        onDone: {
          target: "Onboarding",
        },
      },
    },
  },
  {
    actions: {
      assignUserId: appModel.assign({
        userId: (context, event) => "123", // TODO pull out
      }),
      clearUserId: appModel.assign({
        userId: (context, event) => undefined,
      }),
    },
    guards: {
      isLoggedIn: (context) => {
        return !!context.userId;
      },
    },
    services: {
      bootstrapApp: () => {
        return new Promise<BootstrapProps>((resolve, reject) => {
          resolve({ userId: "123" });
        });
      },
      createNewUser: () => {
        return Promise.resolve<User>({ id: "123" });
      },
      loginUser: () => {
        return Promise.resolve<User>({ id: "123" });
      },
    },
  }
);

interface User {
  id: string;
}

interface BootstrapProps {
  userId?: string;
}

export type AppContext = ContextFrom<typeof appModel>;
export type AppEvent = EventFrom<typeof appModel>;
export type AppActor = ActorRefFrom<typeof appMachine>;
