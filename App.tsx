import { Button, StyleSheet, Text, View } from "react-native";
import { useMachine, useSelector } from "@xstate/react";
import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { AppServiceContext, createAppMachine } from "./appMachine";
import { ActorRef } from "xstate";
import { Init } from "./screens/Init";
import { Welcome } from "./screens/Welcome";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Review } from "./screens/Review";

export default function App() {
  const appMachine = useMemo(() => createAppMachine(), []);
  const [state, send, appService] = useMachine(appMachine);

  return (
    <View style={styles.container}>
      <AppServiceContext.Provider value={appService}>
        <Init />
        <Home />
        <Login />
        <Review />
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
