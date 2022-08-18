import { useSelector } from "@xstate/react";
import { FC, Fragment, useCallback, useContext } from "react";
import { Button, Text, View } from "react-native";
import { CardActorRef, cardModel } from "./cardMachine";

interface Props {
  cardActorRef: CardActorRef;
}

export const Card: FC<Props> = ({ cardActorRef }) => {
  const isReviewing = useSelector(cardActorRef, (state) =>
    state.matches("Reviewing")
  );
  const isRevealed = useSelector(
    cardActorRef,
    (state) => !state.matches("Reviewing.Prompt")
  );
  const cardData = useSelector(cardActorRef, (state) => state.context.card);

  const handleReveal = useCallback(() => {
    cardActorRef.send(cardModel.events.REVEAL());
  }, [cardActorRef]);

  const handleCorrect = useCallback(() => {
    cardActorRef.send(cardModel.events.SUBMIT_RESPONSE(true));
  }, [cardActorRef]);

  const handleIncorrect = useCallback(() => {
    cardActorRef.send(cardModel.events.SUBMIT_RESPONSE(false));
  }, [cardActorRef]);

  if (!isReviewing) {
    return <Fragment />;
  }

  return (
    <View>
      {isRevealed ? (
        <View>
          <Text>{cardData.nativeTranslation}</Text>
          <Text>{cardData.foreignTranslation}</Text>
          <View>
            <Button onPress={handleIncorrect} title="Incorrect" />
            <Button onPress={handleCorrect} title="Correct" />
          </View>
        </View>
      ) : (
        <Button onPress={handleReveal} title="Reveal" />
      )}
    </View>
  );
};
