import { ContextFrom, EventFrom, ActorRefFrom, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { Session } from "./types";

// Keep in sync with web ui editor @
// https://stately.ai/viz/d92068c1-9fa7-4f82-a7ca-b39165c873eb

// Psuedo code

// 1. Fetch N sessions from server                                 LOADING
// 2. Show the first session                       (SHOW_CARD)     LISTENING
// 3. Tap the session to reveal it.                (REVEAL)        RESPONDING
// 4. Correct and incorrect buttons appear.

// Session has it's own machine
// Parallel states for Sessions
// Render 3 sessions
// Each session has it's own state machine
// Toggles between off screen left, visible, off screen right
// Toggles between front and back

const sessionModel = createModel(
  {
    session: {} as Session,
  },
  {
    events: {
      REVEAL: () => ({}),
      PLAY: () => ({}),
    },
  }
);

const sessionMachine = sessionModel.createMachine(
  {
    id: "SessionMachine",
    type: "parallel",
    states: {},
  },
  {}
);

export type SessionState = StateFrom<typeof sessionMachine>;

export const createSessionMachine = (session: Session) =>
  sessionMachine.withContext({ session });

export type SessionActorRef = ActorRefFrom<typeof sessionMachine>;
