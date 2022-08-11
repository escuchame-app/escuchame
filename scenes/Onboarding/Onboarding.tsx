import { useInterpret, useMachine, useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext, useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";

const OnboardingScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Onboarding")) {
    return <Fragment />;
  }

  return <OnboardingComponent />;
});

function OnboardingComponent() {
  const appService = useContext(AppServiceContext);

  const handleContinue = useCallback(() => {
    appService.send("CONTINUE");
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <Button onPress={handleContinue} title="Continue" />
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

export { OnboardingScene };
