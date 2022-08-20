import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { appModel } from "../../appMachine";
import { AppServiceContext } from "../../AppService";
import { supabase } from "../../lib/supabase";

const HomeScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  if (appState !== "Home") {
    return <Fragment />;
  }

  return <HomeComponent />;
});

const HomeComponent: FC = () => {
  const appService = useContext(AppServiceContext);

  const handleStart = useCallback(() => {
    appService.send(appModel.events.START_REVIEW());
  }, [appService]);

  const handleOpenSettings = useCallback(() => {
    appService.send(appModel.events.OPEN_SETTINGS());
  }, [appService]);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={handleStart} title="Start" />
      <Button onPress={handleOpenSettings} title="Settings" />
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

export { HomeScene };
