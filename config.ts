import * as Updates from "expo-updates";

type Config = {
  defaultSessionLengthSeconds: number;
  dynamicLinkDomain: string;
};

export const config: Config = Updates.releaseChannel.startsWith("prod")
  ? {
      defaultSessionLengthSeconds: 5 * 60,
      dynamicLinkDomain: "escuchame.page.link",
    }
  : {
      defaultSessionLengthSeconds: 30,
      dynamicLinkDomain: "escuchamestaging.page.link",
    };
