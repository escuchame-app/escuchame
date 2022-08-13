import { ContextFrom, EventFrom, ActorRefFrom } from "xstate";
import { createModel } from "xstate/lib/model";

// Keep in sync with web ui editor @
// https://stately.ai/viz/4a3d93f0-fbad-4c1d-9dce-312d81f37fff

export const reviewModel = createModel(
  {},
  {
    events: {
      REVEAL: () => ({}),
      SUBMIT_RESPONSE: (correct: boolean) => ({ correct }),
      RESUME: () => ({}),
      PAUSE: () => ({}),
      END: () => ({}),
      REFRESH: () => ({}),
    },
  }
);

export const reviewMachine = reviewModel.createMachine(
  {
    id: "ReviewMachine",
    type: "parallel",
    states: {
      Current: {
        initial: "Front",
        states: {
          Front: {
            on: {
              REVEAL: "Back",
            },
          },
          Back: {
            on: {
              SUBMIT_RESPONSE: "Out",
            },
          },
          Out: {},
        },
      },
      OnDeck: {
        initial: "Preload",
        states: {
          Preload: {
            invoke: {
              src: "preloadCard",
              onDone: "Loaded",
              onError: "Error",
            },
          },
          Loaded: {},
          Error: {},
        },
      },
      Session: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "getSession",
              onDone: "Active",
              onError: "Error",
            },
          },
          Paused: {
            on: {
              RESUME: {
                target: "Active",
              },
            },
          },
          Error: {
            type: "final" as const,
          },
          Active: {
            on: {
              PAUSE: {
                target: "Paused",
              },
              SUBMIT_RESPONSE: [
                {
                  target: "Complete",
                  cond: "isSessionFinished",
                },
                {
                  target: "Active",
                },
              ],
            },
          },
          Complete: {
            type: "final" as const,
          },
        },
      },
      Cards: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "getNextCards",
              onDone: "Loaded",
              onError: "Error",
            },
          },
          Loaded: {
            on: {
              REFRESH: "Loading",
            },
          },
          Error: {},
        },
      },
    },
  },
  {
    guards: {
      isSessionFinished: (context, event) => false,
    },
    services: {
      getSession: (context, event) => Promise.resolve({ id: "1" }),
      getNextCards: (context, event) =>
        Promise.resolve([{ id: "1" }, { id: "2" }]),
    },
  }
);

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
