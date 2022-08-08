import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../appMachine";

const Home = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleStart = useCallback(() => {
    appService.send("review:start");
  }, [appService]);

  const handleOpenSettings = useCallback(() => {
    appService.send("open:settings");
  }, [appService]);

  if (appState !== "Home") {
    return <Fragment />;
  }

  return (
    <HomeComponent
      onPressStart={handleStart}
      onPressOpenSettings={handleOpenSettings}
    />
  );
});

interface HomeComponentProps {
  onPressStart: () => void;
  onPressOpenSettings: () => void;
}

const HomeComponent: FC<HomeComponentProps> = ({
  onPressStart,
  onPressOpenSettings,
}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={onPressStart} title="Start" />
      <Button onPress={onPressOpenSettings} title="Settings" />
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

export { Home };
