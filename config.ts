import * as Updates from "expo-updates";

type Config = {
  defaultSessionLengthSeconds: number;
  firebase: FirebaseConfig;
  dynamicLinkDomain: string;
};

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const stagingFirebaseConfig = {
  apiKey: "AIzaSyDKLbmxFx-WjbicNBD3zYVL_cOvcPROTKA",
  authDomain: "escuchame-staging.firebaseapp.com",
  projectId: "escuchame-staging",
  storageBucket: "escuchame-staging.appspot.com",
  messagingSenderId: "38584181436",
  appId: "1:38584181436:web:69435843380785d01ce6b9",
  measurementId: "G-CMPGY7Y10Y",
};

const prodFirebaseConfig = {
  apiKey: "AIzaSyCOzsHo1UeuiEPu8lgKqbudNHt9IpXfeZE",
  authDomain: "escuchame-prod.firebaseapp.com",
  projectId: "escuchame-prod",
  storageBucket: "escuchame-prod.appspot.com",
  messagingSenderId: "1046773290020",
  appId: "1:1046773290020:web:d09915c329c1bb1c5134b1",
  measurementId: "G-9W91CPYWXV",
};

export const config: Config = Updates.releaseChannel.startsWith("prod")
  ? {
      defaultSessionLengthSeconds: 5 * 60,
      firebase: prodFirebaseConfig,
      dynamicLinkDomain: "escuchame.page.link",
    }
  : {
      defaultSessionLengthSeconds: 30,
      firebase: stagingFirebaseConfig,
      dynamicLinkDomain: "escuchamestaging.page.link",
    };
