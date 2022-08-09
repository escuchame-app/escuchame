import { useSelector } from "@xstate/react";
import React, { FC, Fragment, memo, useCallback, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppServiceContext } from "../../AppService";

const Settings = memo(() => {
  const appService = useContext(AppServiceContext);
  const appState = useSelector(appService, (state) => state.value);

  const handleBack = useCallback(() => {
    appService.send("navigate:back");
  }, []);

  const handleLogout = useCallback(() => {
    appService.send("logout");
  }, []);

  if (appState !== "Settings") {
    return <Fragment />;
  }

  return (
    <SettingsComponent onPressBack={handleBack} onPressLogout={handleLogout} />
  );
});

interface SettingsComponentProps {
  onPressLogout: () => void;
  onPressBack: () => void;
}

const SettingsComponent: FC<SettingsComponentProps> = ({
  onPressLogout,
  onPressBack,
}) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={onPressBack} title="Back" />
      <Button onPress={onPressLogout} title="Logout" />
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

export { Settings };
