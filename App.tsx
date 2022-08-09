import { useInterpret } from "@xstate/react";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StyleSheet, View } from "react-native";
import { appMachine } from "./appMachine";
import { AppServiceContext } from "./AppService";
import { config } from "./config";
import { Home } from "./scenes/Home";
import { Init } from "./scenes/Init";
import { Login } from "./scenes/Login";
import { Onboarding } from "./scenes/Onboarding";
import { Review } from "./scenes/Review";
import { Settings } from "./scenes/Settings";
import { Welcome } from "./scenes/Welcome";
import { send } from "xstate";

if (getApps().length === 0) {
  initializeApp(config.firebase);
}

interface BootstrapProps {
  userId?: string;
}

const bootstrapApp = () =>
  new Promise<BootstrapProps>((resolve, reject) => {
    resolve({ userId: undefined });
  });

const createNewUser = () =>
  new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
      unsubscribe();
    });
  });

export default function App() {
  const appService = useInterpret(appMachine, {
    services: {
      bootstrapApp,
      createNewUser,
    },
  });

  return (
    <View style={styles.container}>
      <AppServiceContext.Provider value={appService}>
        <Init />
        <Home />
        <Login />
        <Onboarding />
        <Review />
        <Settings />
        <Welcome />
      </AppServiceContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
