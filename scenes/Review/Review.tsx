import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Review = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleBack = useCallback(() => {
    appService.send("navigate:back");
  }, [appService]);

  if (appState !== "Review") {
    return <Fragment />;
  }

  return <ReviewComponent onPressBack={handleBack} />;
});

interface ReviewComponentProps {
  onPressBack: () => void;
}

const ReviewComponent: FC<ReviewComponentProps> = ({ onPressBack }) => {
  return (
    <View style={styles.container}>
      <Text>Review</Text>
      <Button onPress={onPressBack} title="Back" />
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

export { Review };
