import { useSelector } from "@xstate/react";
import { FC, useCallback, useContext } from "react";
import { Button, Text, View } from "react-native";
import { CardActorRef, cardModel } from "./cardMachine";

interface Props {
  cardActorRef: CardActorRef;
}

export const Card: FC<Props> = ({ cardActorRef }) => {
  const cardData = useSelector(cardActorRef, (state) => state.context.card);

  const handleCorrect = useCallback(() => {
    cardActorRef.send(cardModel.events.SUBMIT_RESPONSE(true));
  }, [cardActorRef]);
  const handleIncorrect = useCallback(() => {
    cardActorRef.send(cardModel.events.SUBMIT_RESPONSE(false));
  }, [cardActorRef]);

  return (
    <View>
      <Text>{cardData.nativeTranslation}</Text>
      <Text>{cardData.foreignTranslation}</Text>
      <View>
        <Button onPress={handleIncorrect} title="Incorrect" />
        <Button onPress={handleCorrect} title="Correct" />
      </View>
    </View>
  );
};
