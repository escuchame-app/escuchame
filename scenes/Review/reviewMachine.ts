import {
  ContextFrom,
  EventFrom,
  ActorRefFrom,
  StateFrom,
  assign,
  DoneInvokeEvent,
  spawn,
} from "xstate";
import { createModel } from "xstate/lib/model";
import { CardActorRef, createCardMachine } from "./cardMachine";
import { Card, Session } from "./types";

// Keep in sync with web ui editor @
// https://stately.ai/viz/4a3d93f0-fbad-4c1d-9dce-312d81f37fff

export const reviewModel = createModel(
  {
    cardQueue: [] as CardActorRef[],
    currentCardRef: undefined as CardActorRef | undefined,
    session: {} as Session,
  },
  {
    events: {
      NEXT: () => ({}),
    },
  }
);

export const reviewMachine = reviewModel.createMachine(
  {
    id: "ReviewMachine",
    type: "parallel",
    states: {
      Session: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              id: "getSession",
              src: (context) => getSession(),
              onDone: {
                target: "Active",
                actions: assign({
                  session: (context, event: DoneInvokeEvent<Session>) =>
                    event.data,
                }),
              },
            },
          },
          Paused: {},
          Active: {
            on: {
              NEXT: [
                {
                  target: "Complete",
                  cond: "isSessionComplete",
                },
                {
                  target: "Active",
                },
              ],
            },
          },
          Complete: {},
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
                actions: assign({
                  cardQueue: (context, event: DoneInvokeEvent<Card[]>) => {
                    return event.data.map((card) =>
                      spawn(createCardMachine(card))
                    );
                  },
                }),
              },
              onError: "Error",
            },
          },
          Loaded: {
            on: {
              NEXT: {
                target: "Loading",
                cond: "almostOutOfCards",
              },
            },
          },
          Error: {},
        },
      },
    },
  },
  {
    actions: {},
    guards: {
      isSessionFinished: (context, event) => false,
      almostOutOfCards: (context) => context.cardQueue.length <= 5,
    },
  }
);

const getSession = async (): Promise<Session> => {
  return { id: "1" };
};

const getNextCards = async (): Promise<Card[]> => {
  return [
    {
      id: "1",
      nativeTranslation: "Hello my name is Jon",
      foreignTranslation: "Hola mi nombre es juan",
      audioURL:
        "https://storage.googleapis.com/escuchame-card-data-staging/Tatoeba%20arh%20sentence%20EngID%2042168%20SpaID%201240330.mp3",
    },
    {
      id: "2",
      nativeTranslation: "Music is my language and the world is my famil",
      foreignTranslation: "Musica es mi lengua y la mundo es mi familia",
      audioURL:
        "https://storage.googleapis.com/escuchame-card-data-staging/Tatoeba%20arh%20sentence%20EngID%202064857%20SpaID%202071823.mp3",
    },
  ];
};

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
export type ReviewState = StateFrom<typeof reviewMachine>;
