import { ContextFrom, EventFrom, ActorRefFrom } from "xstate";
import { createModel } from "xstate/lib/model";

// Keep in sync with web ui editor @
// https://stately.ai/viz/d4f24999-f44d-4450-8e9c-ff1574a7a097

export const reviewModel = createModel(
  {},
  {
    events: {
      REVEAL: () => ({}),
      SUBMIT_RESPONSE: (correct: boolean) => ({ correct }),
      PAUSE: () => ({}),
    },
  }
);

export const reviewMachine = reviewModel.createMachine({
  id: "ReviewMachine",
  initial: "Init",
  context: reviewModel.initialContext,
  states: {
    Init: {},
  },
});

export type ReviewContext = ContextFrom<typeof reviewModel>;
export type ReviewEvent = EventFrom<typeof reviewModel>;
export type ReviewActor = ActorRefFrom<typeof reviewMachine>;
