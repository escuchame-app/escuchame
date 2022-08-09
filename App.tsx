import { useInterpret, useMachine } from "@xstate/react";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { appMachine } from "./appMachine";
import { AppServiceContext } from "./AppService";
import { config } from "./config";
import { Home } from "./scenes/Home";
import { Init } from "./scenes/Init";
import { Login } from "./scenes/Login";
import { Review } from "./scenes/Review";
import { Settings } from "./scenes/Settings";
import { Welcome } from "./scenes/Welcome";
import { initializeApp, getApps } from "firebase/app";
import { Onboarding } from "./scenes/Onboarding";

if (getApps().length === 0) {
  initializeApp(config.firebase);
}

export default function App() {
  const appService = useInterpret(appMachine);

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
