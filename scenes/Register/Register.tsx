import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import { appModel } from "../../appMachine";

const RegisterScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Register")) {
    return <Fragment />;
  }

  return <RegisterComponent />;
});

function RegisterComponent() {
  const appService = useContext(AppServiceContext);

  const handleSubmit = useCallback(() => {
    const email = "foo@bar.com";
    appService.send(appModel.events.SUBMIT_REGISTRATION({ email }));
  }, [appService]);

  const handleBack = useCallback(() => {
    appService.send(appModel.events.BACK());
  }, [appService]);

  return (
    <View style={styles.container}>
      <Button onPress={handleBack} title="Back" />
      <Text>Register</Text>
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

export { RegisterScene };
