import { useInterpret } from "@xstate/react";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StyleSheet, View } from "react-native";
import { appMachine } from "./appMachine";
import { AppServiceContext } from "./AppService";
import { config } from "./config";
import { HomeScene } from "./scenes/Home";
import { InitScene } from "./scenes/Init";
import { LoginScene } from "./scenes/Login";
import { OnboardingScene } from "./scenes/Onboarding";
import { ReviewScene } from "./scenes/Review";
import { SettingsScene } from "./scenes/Settings";
import { WelcomeScene } from "./scenes/Welcome";

if (getApps().length === 0) {
  initializeApp(config.firebase);
}

export default function App() {
  const appService = useInterpret(appMachine);

  return (
    <View style={styles.container}>
      <AppServiceContext.Provider value={appService}>
        <InitScene />
        <WelcomeScene />
        <OnboardingScene />
        <LoginScene />
        <HomeScene />
        <ReviewScene />
        <SettingsScene />
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
