import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import { appModel } from "../../appMachine";
import { supabase } from "../../lib/supabase";

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

  const handleChangeEmail = useCallback(() => {
  }, []);

  const handleChangePassword = useCallback(() => {
  }, []);

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
      <TextInput placeholder="Email address" onChangeText={handleChangeEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={handleChangePassword} style={styles.input} />
      <Button onPress={handleBack} title="Back" />
      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 36,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export { LoginScene };
