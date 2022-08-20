import { useInterpret, useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { definitions } from "../../@types/supabase";
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

  useEffect(() => {
    // const allCards = supabase.from<definitions["cards"]>("cards").select("id");
  }, []);

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
