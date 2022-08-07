import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

function Settings() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});