import {
  ContextFrom,
  EventFrom,
  ActorRefFrom,
  StateFrom,
  assign,
  DoneInvokeEvent,
  spawn,
  actions,
} from "xstate";
import { createModel } from "xstate/lib/model";
import { CardActorRef, createCardMachine } from "./cardMachine";
import { SessionActorRef, createSessionMachine } from "./sessionMachine";
import { Card, Session } from "./types";

// Keep in sync with web ui editor @
// https://stately.ai/viz/4a3d93f0-fbad-4c1d-9dce-312d81f37fff

export const reviewModel = createModel(
  {
    cardQueue: [] as CardActorRef[],
    currentCardRef: undefined as CardActorRef | undefined,
    sessionRef: undefined as SessionActorRef | undefined,
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
    initial: "Loading",
    states: {
      Loading: {
        invoke: {
          id: "startSession",
          src: (context) => startSession(),
          onError: {},
          onDone: {
            target: "Playing",
            actions: assign({
              sessionRef: (
                context,
                event: DoneInvokeEvent<StartSessionResponse>
              ) => spawn(createSessionMachine(event.data.session)),
              cardQueue: (
                context,
                event: DoneInvokeEvent<StartSessionResponse>
              ) =>
                event.data.cards.map((card) => spawn(createCardMachine(card))),
            }),
          },
        },
      },
      Error: {},
      Playing: {
        entry: ["setNextCard"],
      },
      Complete: {},
    },
  },
  {
    actions: {
      setNextCard: assign({
        currentCardRef: (context, event) => {
          return context.cardQueue.shift();
        },
      }),
    },
    guards: {},
  }
);

interface StartSessionResponse {
  session: Session;
  cards: Card[];
}

const mockCards = [
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

const startSession: () => Promise<StartSessionResponse> = async () => {
  const session: Session = {
    id: "foo",
  };

  return {
    session,
    cards: mockCards,
  };
};

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
export type ReviewState = StateFrom<typeof reviewMachine>;
