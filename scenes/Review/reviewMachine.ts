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
import { send } from "xstate/lib/actions";
import { createModel } from "xstate/lib/model";
import { definitions } from "../../@types/supabase";
import { supabase } from "../../lib/supabase";
import { CardActorRef, createCardMachine } from "./cardMachine";
import { SessionActorRef, createSessionMachine } from "./sessionMachine";
import { Card, Session } from "./types";

// Keep in sync with web ui editor @
// https://stately.ai/viz/4a3d93f0-fbad-4c1d-9dce-312d81f37fff

export const reviewModel = createModel(
  {
    cardQueue: [] as CardActorRef[],
    currentIndex: 0,
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
              sessionRef: (_, event: DoneInvokeEvent<StartSessionResponse>) =>
                spawn(createSessionMachine(event.data.session)),
              cardQueue: (_, event: DoneInvokeEvent<StartSessionResponse>) =>
                event.data.cards.map((card) => spawn(createCardMachine(card))),
            }),
          },
        },
      },
      Error: {},
      Playing: {
        invoke: {
          id: "showNextCard",
          src: (context, event) =>
            new Promise((resolve, reject) => {
              const nextCard = context.cardQueue[context.currentIndex];

              if (!nextCard) {
                throw new Error("TS assert: no cards in queue");
              }

              nextCard.send("SHOW");
              const sub = nextCard.subscribe((state) => {
                if (state.event.type === "SUBMIT_RESPONSE") {
                  resolve(undefined);
                  sub.unsubscribe();
                }
              });
            }),
          onDone: {
            target: "Playing",
            actions: "incrementIndex",
          },
          onError: "Error",
        },
        on: {
          NEXT: [
            {
              target: "Complete",
              cond: "isSessionComplete",
            },
            {
              target: "Playing",
            },
          ],
        },
      },
      Complete: {},
    },
  },
  {
    actions: {
      incrementIndex: reviewModel.assign({
        currentIndex: (ctx) => ctx.currentIndex + 1,
      }),
    },
    guards: {
      isSessionComplete: (context) => false,
    },
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
  const id = supabase.auth.session()?.user?.id;
  if (!id) {
    throw new Error("ts assert: no id");
  }

  const { data, error } = await supabase
    .from<definitions["sessions"]>("sessions")
    .insert([{ user_id: id }]);

  console.log(data);

  return {
    session: {
      id: "foo",
    },
    cards: mockCards,
  };
};

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
export type ReviewState = StateFrom<typeof reviewMachine>;
