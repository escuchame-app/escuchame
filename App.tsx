import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useMachine, useSelector } from "@xstate/react";
import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { createAppMachine } from "./appMachine";
import { ActorRef } from "xstate";

function Welcome() {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleGetStarted = useCallback(() => {
    appService.send("navigate:onboarding");
  }, [appService]);

  const handleLogin = useCallback(() => {
    appService.send("navigate:login");
  }, [appService]);

  if (appState !== "Welcome") {
    return <Fragment />;
  }

  return (
    <WelcomeComponent
      onPressGetStarted={handleGetStarted}
      onPressLogin={handleLogin}
    />
  );
}

interface WelcomeComponentProps {
  onPressGetStarted: () => void;
  onPressLogin: () => void;
}

function WelcomeComponent({
  onPressGetStarted,
  onPressLogin,
}: WelcomeComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button onPress={onPressGetStarted} title="Get Started" />
      <Button onPress={onPressLogin} title="Login" />
    </View>
  );
}

function Review() {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "Review") {
    return <Fragment />;
  }

  return (
    <View style={styles.container}>
      <Text>Review</Text>
    </View>
  );
}

function Onboarding() {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "Onboarding") {
    return <Fragment />;
  }

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
    </View>
  );
}

function Login() {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "Login") {
    return <Fragment />;
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

function SessionRecap() {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "SessionRecap") {
    return <Fragment />;
  }

  return (
    <View style={styles.container}>
      <Text>Session Recap</Text>
    </View>
  );
}

function Home() {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "Home") {
    return <Fragment />;
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const AppServiceContext = createContext<ActorRef<any, any>>(
  {} as ActorRef<any, any>
);

const appMachine = createAppMachine();

export default function App() {
  const [state, send, appService] = useMachine(appMachine);

  useEffect(() => {
    if (state.value === "Splash") {
      send("navigate:welcome");
    }
  }, [send]);

  return (
    <View style={styles.container}>
      <AppServiceContext.Provider value={appService}>
        <Home />
        <Login />
        <Onboarding />
        <Review />
        <SessionRecap />
        <Welcome />
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
