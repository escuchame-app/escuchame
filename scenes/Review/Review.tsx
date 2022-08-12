import { useInterpret, useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { appModel } from "../../appMachine";
import { AppServiceContext } from "../../AppService";
import { reviewMachine, reviewModel } from "./reviewMachine";
import { ReviewServiceContext } from "./ReviewService";

const ReviewScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);
  const reviewService = useInterpret(reviewMachine);

  if (!appState.matches("Review")) {
    return <Fragment />;
  }

  return (
    <ReviewServiceContext.Provider value={reviewService}>
      <ReviewComponent />
    </ReviewServiceContext.Provider>
  );
});

const ReviewComponent: FC = () => {
  const reviewService = useContext(ReviewServiceContext);

  const handlePause = useCallback(() => {
    reviewService.send(reviewModel.events.PAUSE());
  }, [reviewService]);
  const handleCorrect = useCallback(() => {
    reviewService.send(reviewModel.events.SUBMIT_RESPONSE(true));
  }, [reviewService]);
  const handleIncorrect = useCallback(() => {
    reviewService.send(reviewModel.events.SUBMIT_RESPONSE(false));
  }, [reviewService]);

  return (
    <View style={styles.container}>
      <Text>Review</Text>
      <Text>Hola my name is Juan</Text>
      <Text>Hello my name is Jon</Text>
      <Button onPress={handleIncorrect} title="Incorrect" />
      <Button onPress={handleCorrect} title="Correct" />
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
