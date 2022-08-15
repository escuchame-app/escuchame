import { FC, Fragment, useContext } from "react";
import { ReviewState } from "./reviewMachine";
import { useInterpret, useMachine, useSelector } from "@xstate/react";
import { CardActorRef } from "./cardMachine";
import { ActorRef } from "xstate/lib/types";
import { Text, View } from "react-native";

interface Props {
  actorRef: CardActorRef;
}

export const Card: FC<Props> = ({ actorRef }) => {
  const cardData = useSelector(actorRef, (state) => state.context.card);
  console.log("cd", cardData);
  // useSelector(actorRef, (state) => state.)
  //   const reviewService = useInterpret(actorRef);
  //   const currentCardRef = useSelector(
  //     reviewService,
  //     (state: ReviewState) => state.context.currentCard
  //   );

  return (
    <View>
      <Text>{cardData.nativeTranslation}</Text>
      <Text>{cardData.foreignTranslation}</Text>
    </View>
  );
};
