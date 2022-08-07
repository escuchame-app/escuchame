import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Login = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleSubmit = useCallback(() => {
    appService.send("login:success");
  }, [appService]);

  const handleBack = useCallback(() => {
    appService.send("navigate:back");
  }, [appService]);

  if (appState !== "Login") {
    return <Fragment />;
  }

  return <LoginComponent onPressBack={handleBack} onSubmit={handleSubmit} />;
});

interface LoginComponentProps {
  onPressBack: () => void;
  onSubmit: () => void;
}

function LoginComponent({ onPressBack, onSubmit }: LoginComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button onPress={onPressBack} title="Back" />
      <Button onPress={onSubmit} title="Submit" />
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

export { Login };
