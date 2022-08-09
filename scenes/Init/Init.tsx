import * as SplashScreen from "expo-splash-screen";
import { Fragment, memo, useContext, useEffect } from "react";
import { AppServiceContext } from "../../AppService";
import { noop } from "../../utils/misc";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Init = memo(() => {
  const appService = useContext(AppServiceContext);
  useEffect(() => {
    appService.send("navigate:welcome");
    SplashScreen.hideAsync().then(noop);
  }, [appService]);

  return <Fragment />;
});

export { Init };
