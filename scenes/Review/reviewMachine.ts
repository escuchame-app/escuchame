import {
  ActorRefFrom,
  assign,
  ContextFrom,
  DoneInvokeEvent,
  EventFrom,
  spawn,
  StateFrom,
} from "xstate";
import { createModel } from "xstate/lib/model";
import { dataClient } from "../../dataClient";
import { Card, ReviewSession } from "../../types";
import { CardActorRef, createCardMachine } from "./cardMachine";
import { createSessionMachine, SessionActorRef } from "./sessionMachine";

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
          onError: {
            target: "Error",
          },
          onDone: {
            target: "Playing",
            actions: assign({
              sessionRef: (_, event: DoneInvokeEvent<StartSessionResponse>) =>
                spawn(createSessionMachine(event.data.session)),
              cardQueue: (_, event: DoneInvokeEvent<StartSessionResponse>) => {
                return event.data.cards.map((card) =>
                  spawn(createCardMachine(card))
                );
              },
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
  session: ReviewSession;
  cards: Card[];
}

const startSession: () => Promise<StartSessionResponse> = async () => {
  const [sessionResp, cardsResp] = await Promise.all([
    dataClient.startSession(),
    dataClient.getNextCards(),
  ]);

  return {
    session: sessionResp.data,
    cards: cardsResp.data,
  };
};

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
export type ReviewState = StateFrom<typeof reviewMachine>;
