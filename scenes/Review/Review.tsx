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
  console.log({ currentCardRef });

  return (
    <View style={styles.container}>
      {currentCardRef && (
        <Card key={currentCardRef.id} cardActorRef={currentCardRef} />
      )}
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
