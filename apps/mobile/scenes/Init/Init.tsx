import { useInterpret } from "@xstate/react";
import * as SplashScreen from "expo-splash-screen";
import { Fragment, memo, useContext, useEffect } from "react";
import { AppServiceContext } from "../../AppService";
import { noop } from "../../utils/misc";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// TODO might not need this component? Maybe do app in app.tsx
const InitScene = memo(() => {
  useEffect(() => {
    SplashScreen.hideAsync().then(noop);
  }, []);

  return <Fragment />;
});

export { InitScene };
