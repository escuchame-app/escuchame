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

  if (appState !== "Home") {
    return <Fragment />;
  }

  return <HomeComponent onPressStart={handleStart} />;
});

interface HomeComponentProps {
  onPressStart: () => void;
}

const HomeComponent: FC<HomeComponentProps> = ({ onPressStart }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={onPressStart} title="Start" />
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
