import { useInterpret, useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { definitions } from "../../types/supabase";
import { AppServiceContext } from "../../AppService";
import { supabase } from "../../lib/supabase";
import { Card } from "./Card";
import { reviewMachine, ReviewState } from "./reviewMachine";
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
  const cardQueue = useSelector(
    reviewService,
    (state: ReviewState) => state.context.cardQueue
  );
  const hasError = useSelector(reviewService, (state: ReviewState) =>
    state.matches("Error")
  );
  // console.log(reviewService.getSnapshot().event);

  useEffect(() => {
    const allCards = supabase
      .from<definitions["cards"]>("cards")
      .select("*")
      .limit(10)
      .then((f) => {
        // console.log(f);
      });
  }, []);

  if (hasError) {
    return (
      <View style={styles.container}>
        <Text>There was an errror</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cardQueue.map((card) => (
        <Card key={card.id} cardActorRef={card} />
      ))}
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
