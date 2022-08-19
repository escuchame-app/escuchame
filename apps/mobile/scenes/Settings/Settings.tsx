import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { appModel } from "../../appMachine";
import { AppServiceContext } from "../../AppService";

const SettingsScene = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state);

  if (!appState.matches("Settings")) {
    return <Fragment />;
  }

  return <SettingsComponent />;
});

const SettingsComponent: FC = ({}) => {
  const appService = useContext(AppServiceContext);
  const handleBack = useCallback(() => {
    appService.send(appModel.events.BACK());
  }, []);

  const handleLogout = useCallback(() => {
    appService.send(appModel.events.LOGOUT());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={handleBack} title="Back" />
      <Button onPress={handleLogout} title="Logout" />
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

export { SettingsScene };
