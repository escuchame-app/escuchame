import { useInterpret, useMachine } from "@xstate/react";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AppServiceContext, createAppMachine } from "./appMachine";
import { config } from "./config";
import { Home } from "./screens/Home";
import { Init } from "./screens/Init";
import { Login } from "./screens/Login";
import { Review } from "./screens/Review";
import { Settings } from "./screens/Settings";
import { Welcome } from "./screens/Welcome";
import { initializeApp, getApps } from "firebase/app";
import { Onboarding } from "./screens/Onboarding";

if (getApps().length === 0) {
  initializeApp(config.firebase);
}

export default function App() {
  const appMachine = useMemo(() => createAppMachine(), []);
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
