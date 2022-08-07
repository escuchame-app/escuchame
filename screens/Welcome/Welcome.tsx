import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Welcome = memo(() => {
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
});

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

// TODO dedupe
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Welcome };
