import { useSelector } from "@xstate/react";
import { FC } from "react";
import { Text, View } from "react-native";
import { CardActorRef } from "./cardMachine";

interface Props {
  actorRef: CardActorRef;
}

export const Card: FC<Props> = ({ actorRef }) => {
  const cardData = useSelector(actorRef, (state) => state.context.card);

  return (
    <View>
      <Text>{cardData.nativeTranslation}</Text>
      <Text>{cardData.foreignTranslation}</Text>
    </View>
  );
};
