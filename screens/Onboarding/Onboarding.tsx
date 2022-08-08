import { useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Onboarding = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleContinue = useCallback(() => {
    appService.send("onboarding:end");
  }, [appService]);

  if (appState !== "Onboarding") {
    return <Fragment />;
  }

  return <OnboardingComponent onPressContinue={handleContinue} />;
});

interface OnboardingComponentProps {
  onPressContinue: () => void;
}

function OnboardingComponent({ onPressContinue }: OnboardingComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <Button onPress={onPressContinue} title="Continue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Onboarding };
