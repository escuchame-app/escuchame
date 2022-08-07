import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Login = memo(() => {
  const service = useContext(AppServiceContext);
  const appState = useSelector(service, (state) => state.value);

  if (appState !== "Login") {
    return <Fragment />;
  }

  return <LoginComponent />;
});

function LoginComponent() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
