import {
  ContextFrom,
  EventFrom,
  ActorRefFrom,
  StateFrom,
  assign,
  DoneInvokeEvent,
} from "xstate";
import { createModel } from "xstate/lib/model";
import { Card } from "./cardMachine";

// Keep in sync with web ui editor @
// https://stately.ai/viz/4a3d93f0-fbad-4c1d-9dce-312d81f37fff

export const reviewModel = createModel(
  {
    cards: [] as Card[],
  },
  {
    events: {
      REVEAL: () => ({}),
      SUBMIT_RESPONSE: (correct: boolean) => ({ correct }),
      RESUME: () => ({}),
      PAUSE: () => ({}),
      END: () => ({}),
      NEXT: ({ cardId }: { cardId: string }) => ({ cardId }),
      REFRESH: () => ({}),
    },
  }
);

export const reviewMachine = reviewModel.createMachine(
  {
    id: "ReviewMachine",
    type: "parallel",
    states: {
      // this should be spawned dyanmically..
      Session: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "getSession",
              onDone: {
                target: "Active",
                actions: "setSessionId",
              },
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
              id: "getNextCards",
              src: (context) => getNextCards(),
              onDone: {
                target: "Loaded",
                actions: "setCards",
              },
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
    actions: {
      setCards: assign({
        cards: (context, event: any) => event.data,
      }),
    },
    guards: {
      isSessionFinished: (context, event) => false,
    },
    services: {
      getSession: (context, event) => Promise.resolve({ id: "1" }),
    },
  }
);

const getNextCards = async (): Promise<Card[]> => {
  return [{ id: "1" }, { id: "2" }];
};

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
export type ReviewState = StateFrom<typeof reviewMachine>;
