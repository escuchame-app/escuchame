import { useInterpret, useMachine, useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import { reviewMachine, reviewModel, ReviewState } from "./reviewMachine";
import { ReviewServiceContext } from "./ReviewService";
import { Card } from "./Card";
import { CardActorRef } from "./cardMachine";

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
  const currentCardRef = useSelector(
    reviewService,
    (state: ReviewState) => state.context.currentCardRef
  );
  const ctx = useSelector(reviewService, (state) => state.context);
  console.log({ctx})

  const handlePause = useCallback(() => {
    // reviewService.send(reviewModel.events.PAUSE());
  }, [reviewService]);
  const handleCorrect = useCallback(() => {}, [reviewService]);
  const handleIncorrect = useCallback(() => {}, [reviewService]);

  return (
    <View style={styles.container}>
      {currentCardRef && (
        <Card key={currentCardRef.id} actorRef={currentCardRef} />
      )}
      <View>
        <Button onPress={handleIncorrect} title="Incorrect" />
        <Button onPress={handleCorrect} title="Correct" />
      </View>
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
