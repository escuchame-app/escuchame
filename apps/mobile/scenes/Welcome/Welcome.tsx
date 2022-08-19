import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { appModel } from "../../appMachine";
import { AppServiceContext } from "../../AppService";

const WelcomeScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Welcome")) {
    return <Fragment />;
  }

  return <WelcomeComponent />;
});

const WelcomeComponent = memo(() => {
  const appService = useContext(AppServiceContext);

  const handleGetStarted = useCallback(() => {
    const event = appModel.events.START();
    appService.send(event);
  }, [appService]);

  const handleLogin = useCallback(() => {
    const event = appModel.events.OPEN_LOGIN();
    appService.send(event);
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button onPress={handleGetStarted} title="Get Started" />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { WelcomeScene };
