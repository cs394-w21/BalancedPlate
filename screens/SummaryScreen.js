import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text } from "react-native";
import { getFood, fetchFoods } from "../utils/usda";
import WeeklyMacroChart from "../components/WeeklyMacroChart";
import VitaminsAndMinerals from "../components/VitaminsAndMinerals";
import theme from "../utils/theme";
import Recommendations from "../components/Recommendations.js";

const SummaryScreen = () => {
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);
  const [foods, setFoods] = useState(null);

  useEffect(() => {
    const db = firebase.database().ref("users/1x2y3z/log");
    const handleData = (snap) => {
      if (snap.val()) setLog(snap.val());
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("admin");
    const handleData = (snap) => {
      if (snap.val()) {
        setAdmin(snap.val());
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  useEffect(() => {
    console.log("Foods:", foods);
  }, [foods]);

  useEffect(() => {
    if (admin && log) {
      const built = Object.keys(log.foods).map((food) => log.foods[food].fdcId);
      fetchFoods(admin.apikey, built).then((value) => {
        if (!foods) {
          setFoods(value);
        }
      });
      //console.log(getFood(admin.apikey, "milk"));
    }
  }, [admin, log]);

  return (
    <View style={styles.container}>
      {log && foods ? (
        <>
          <View style={{ textAlign: "center" }}>
            <Text style={{ fontSize: 30 }}>Weekly Summary</Text>
          </View>
          <WeeklyMacroChart log={log} foodResults={foods} />
          <VitaminsAndMinerals log={log} foodResults={foods} />
          <Recommendations />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default SummaryScreen;
