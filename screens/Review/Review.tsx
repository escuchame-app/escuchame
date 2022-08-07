import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Review = memo(() => {
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Review };
