import { ContextFrom, EventFrom, ActorRefFrom, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { Card } from "./types";

// Keep in sync with web ui editor @
// https://stately.ai/viz/d92068c1-9fa7-4f82-a7ca-b39165c873eb

// Psuedo code

// 1. Fetch N cards from server                                 LOADING
// 2. Show the first card                       (SHOW_CARD)     LISTENING
// 3. Tap the card to reveal it.                (REVEAL)        RESPONDING
// 4. Correct and incorrect buttons appear.

// Card has it's own machine
// Parallel states for Cards
// Render 3 cards
// Each card has it's own state machine
// Toggles between off screen left, visible, off screen right
// Toggles between front and back

const cardModel = createModel(
  {
    card: {} as Card,
  },
  {
    events: {
      REVEAL: () => ({}),
      PLAY: () => ({}),
    },
  }
);

const cardMachine = cardModel.createMachine(
  {
    id: "CardMachine",
    type: "parallel",
    states: {
      Audio: {
        initial: "Loading",
        states: {
          Loading: {
            invoke: {
              src: "loadAudio",
              onDone: "Idle",
            },
          },
          Playing: {
            invoke: {
              src: "playAudio",
              onDone: "Idle",
            },
          },
          Idle: {},
        },
      },
    },
  },
  {
    guards: {},
    services: {
      loadAudio: () => Promise.resolve(),
      playAudio: () => Promise.resolve(),
    },
  }
);

export type CardState = StateFrom<typeof cardMachine>;

export const createCardMachine = (card: Card) =>
  cardMachine.withContext({ card });

export type CardActorRef = ActorRefFrom<typeof cardMachine>;
