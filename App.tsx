import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useMachine, useSelector } from "@xstate/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { createAppMachine } from "./appMachine";
import { ActorRef } from "xstate";

function WelcomeContainer() {
  const service = useContext(AppServiceContext);
  const val = useSelector(service, (state) => state.value);

  const handlePressWelcome = useCallback(() => {
    console.log(val);
  }, []);

  return <WelcomeComponent onPressWelcome={handlePressWelcome} />;
}

interface WelcomeComponentProps {
  onPressWelcome: () => void;
}

function WelcomeComponent({ onPressWelcome }: WelcomeComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button onPress={onPressWelcome} title="Hello" />
    </View>
  );
}

function Review() {
  return (
    <View style={styles.container}>
      <Text>Review</Text>
    </View>
  );
}

function Onboarding() {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
    </View>
  );
}

function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

function SessionRecap() {
  return (
    <View style={styles.container}>
      <Text>Session Recap</Text>
    </View>
  );
}

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

export default function App() {
  const appMachine = useMemo(() => createAppMachine(), []);
  const [state, send, appService] = useMachine(appMachine);

  useEffect(() => {
    if (state.value === "INITIALIZING") {
      send("navigate:welcome");
    }
  }, [send]);

  useEffect(() => {
    console.log("state change");
  }, [state]);
  // console.log(state.value);

  // state.context

  return (
    <View style={styles.container}>
      <AppServiceContext.Provider value={appService}>
        <Home />
        <Login />
        <Onboarding />
        <Review />
        <SessionRecap />
        <WelcomeContainer />
      </AppServiceContext.Provider>
      {/* <StatusBar style="auto" /> */}
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
