import { ActorRefFrom, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { Audio, InterruptionModeIOS } from "expo-av";

const audioTrackModel = createModel(
  {
    sound: {} as Audio.Sound,
  },
  {
    events: {},
  }
);

const audioTrackMachine = audioTrackModel.createMachine({
  initial: "Idle",
  states: {
    Idle: {},
    Playing: {},
  },
});

export const createAudioTrackMachine = (audioURL: string) =>
  audioTrackMachine.withContext({
    sound: new Audio.Sound(),
  });

export type AudioTrackActorRef = ActorRefFrom<typeof audioTrackMachine>;
