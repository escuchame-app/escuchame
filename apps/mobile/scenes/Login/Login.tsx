import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import { appModel } from "../../appMachine";

const LoginScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Login")) {
    return <Fragment />;
  }

  return <LoginComponent />;
});

function LoginComponent() {
  const appService = useContext(AppServiceContext);

  const handleSubmit = useCallback(() => {
    const email = "foo@bar.com";
    appService.send(appModel.events.SUBMIT_LOGIN({ email }));
  }, [appService]);

  const handleBack = useCallback(() => {
    appService.send(appModel.events.BACK());
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button onPress={handleBack} title="Back" />
      <Button onPress={handleSubmit} title="Submit" />
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

export { LoginScene };
