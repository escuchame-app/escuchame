import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import APP_MACHINE from "./appMachine.json";
import { useEffect } from "react";

const appMachine = createMachine(APP_MACHINE);

function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
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

export default function App() {
  const [state, send] = useMachine(appMachine);

  useEffect(() => {
    if (state.value === "INITIALIZING") {
      send("navigate:home");
    }
  }, [send]);
  console.log(state.value);

  return (
    <View style={styles.container}>
      {state.matches("HOME") && <Home />}
      {state.matches("LOGIN") && <Login />}
      {state.matches("ONBOARDING") && <Onboarding />}
      {state.matches("REVIEW") && <Review />}
      {state.matches("SESSION_RECAP") && <SessionRecap />}
      {state.matches("WELCOME") && <Welcome />}
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
