import convert from "convert-units";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import Constants from "expo-constants";

const measures = convert().measures();
const primaryColor = "#052f5f";

const MeasureView = ({ measure }) => <Text>{measure}</Text>;

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, " $1");
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map((m) => ({ key: m, title: unCamelCase(m) }))
  );

  const renderScene = ({ route }) => {
    return <MeasureView measure={route.key} />;
  };

  return (
    <View style={[styles.scene, { marginTop: Constants.statusBarHeight }]}>
      <Text style={styles.title}>unit Convertool</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            tabStyle={{ width: "auto" }}
            indicatorStyle={{ backgroundColor: "white" }}
            style={{ backgroundColor: primaryColor }}
          />
        )}
      ></TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  title: {
    padding: 15,
    fontWeight: "bold",
    color: primaryColor,
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
