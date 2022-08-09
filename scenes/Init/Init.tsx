import { useInterpret } from "@xstate/react";
import * as SplashScreen from "expo-splash-screen";
import { Fragment, memo, useContext, useEffect } from "react";
import { AppServiceContext } from "../../AppService";
import { noop } from "../../utils/misc";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Init = memo(() => {
  const appService = useContext(AppServiceContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        appService.send("NAVIGATE_HOME");
      } else {
        appService.send("NAVIGATE_WELCOME");
      }

      SplashScreen.hideAsync().then(noop);
      unsubscribe();
    });
  }, [appService]);

  return <Fragment />;
});

export { Init };
