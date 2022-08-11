import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { appModel } from "../../appMachine";
import { AppServiceContext } from "../../AppService";

const ReviewScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Review")) {
    return <Fragment />;
  }

  return <ReviewComponent />;
});

const ReviewComponent: FC = () => {
  const appService = useContext(AppServiceContext);

  const handlePause = useCallback(() => {
    appService.send(appModel.events.PAUSE_REVIEW());
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Review</Text>
      <Button onPress={handlePause} title="Pause" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ReviewScene };
