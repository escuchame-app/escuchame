import { useInterpret, useMachine, useSelector } from "@xstate/react";
import React, { Fragment, memo, useCallback, useContext, useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";
import {
  createOnboardingMachine,
  OnboardingServiceContext,
} from "./onboardingMachine";

const Onboarding = memo(() => {
  const onboardingMachine = useMemo(() => createOnboardingMachine(), []);
  const service = useInterpret(onboardingMachine, {
    services: {
      createNewUser: (_, e) => {
        console.log("create new user");
        // TODO firebase
        return Promise.resolve();
      },
    },
  });

  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  if (appState !== "Onboarding") {
    return <Fragment />;
  }

  return (
    <OnboardingServiceContext.Provider value={service}>
      <OnboardingComponent />
    </OnboardingServiceContext.Provider>
  );
});

function OnboardingComponent() {
  const onboardingService = useContext(OnboardingServiceContext);
  const onboardingState = useSelector(
    onboardingService,
    (state) => state.value
  );

  const isReady = onboardingState === "Success";

  const appService = useContext(AppServiceContext);
  const handleContinue = useCallback(() => {
    appService.send("ONBOARDING_END");
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      {isReady && <Button onPress={handleContinue} title="Continue" />}
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
