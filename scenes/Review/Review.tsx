import { useInterpret, useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import { reviewMachine, reviewModel, ReviewState } from "./reviewMachine";
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
  const isSessionActive = useSelector(reviewService, (state) =>
    state.matches({ Session: "Active" })
  );

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
      {isSessionActive && <Text>Active</Text>}
      <Cards />
      <View>
        <Button onPress={handleIncorrect} title="Incorrect" />
        <Button onPress={handleCorrect} title="Correct" />
      </View>
      <Button onPress={handlePause} title="Pause" />
    </View>
  );
};

const Cards = () => {
  const reviewService = useContext(ReviewServiceContext);
  const cards = useSelector(
    reviewService,
    (state: ReviewState) => state.context.cards
  );
  console.log("hi!", cards);

  return <Fragment />;
};

// const Card = ({ cardService }) => {
//   return (
//     <View>
//       <Text>Hola my name is Juan</Text>
//       <Text>Hello my name is Jon</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ReviewScene };
