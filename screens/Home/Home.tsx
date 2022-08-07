import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Home = memo(() => {
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Home };
