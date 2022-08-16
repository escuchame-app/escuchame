import { ActorRefFrom, spawn, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { noop } from "../../utils/misc";
import { Card } from "./types";
import { Audio, InterruptionModeIOS } from "expo-av";
import {
  AudioTrackActorRef,
  createAudioTrackMachine,
} from "./audioTrackMachine";

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

export const cardModel = createModel(
  {
    card: {} as Card,
    audioTrackRef: {} as AudioTrackActorRef,
  },
  {
    events: {
      MAKE_ACTIVE: () => ({}),
      REVEAL: () => ({}),
      PLAY: () => ({}),
      SUBMIT_RESPONSE: (correct: boolean) => ({ correct }),
    },
  }
);

// Next step: send the "NEXT" event to
// the parent machine, which responds to it
// and sets the next card.

const cardMachine = cardModel.createMachine(
  {
    id: "CardMachine",
    initial: "Queued",
    entry: cardModel.assign({
      audioTrackRef: (context) =>
        spawn(createAudioTrackMachine(context.card.audioURL)),
    }),
    states: {
      Queued: {
        on: {
          MAKE_ACTIVE: "Reviewing",
        },
      },
      Reviewing: {
        initial: "Prompt",
        states: {
          Prompt: {
            on: {
              REVEAL: "Answer",
            },
          },
          Answer: {},
        },
      },
      Complete: {
        type: "final" as const,
      },
    },
  },
  {
    services: {},
  }
);

// const audioTrackMachine = audioTrackModel.createMachine({
//       // This should probably be it's own spawned machine..
//       Audio: {
//         initial: "Idle",
//         // TODO when do we call loadAudio?
//         states: {
//           Playing: {
//             invoke: {
//               src: "playAudio",
//               onDone: "Finished",
//               onError: "Error",
//             },
//           },
//           Error: {},
//           Idle: {
//             on: {
//               PLAY: "Playing",
//             },
//           },
//           Finished: {
//             type: "final" as const,
//           },
//         },
//       });

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  interruptionModeIOS: InterruptionModeIOS.DuckOthers,
}).then(noop);

export type CardState = StateFrom<typeof cardMachine>;

export const createCardMachine = (card: Card) =>
  cardMachine.withContext({
    card,
    audioTrackRef: {} as AudioTrackActorRef /* TS hack */,
  });

export type CardActorRef = ActorRefFrom<typeof cardMachine>;
