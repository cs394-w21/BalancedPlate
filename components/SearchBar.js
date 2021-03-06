import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";
import theme from "../utils/theme";
import { getFood } from "../utils/usda";

const SearchBar = ({ admin, results, setResults }) => {
  const [value, onChangeText] = useState("");

  async function handleFood() {
    if (admin) {
      console.log("REPEAT");
      return getFood(admin.apikey, value);
    } else {
      console.log("Admin invalid");
    }
  }

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <View style={{    
      borderWidth: 1, 
      borderStyle: 'solid', 
      borderColor: 'black', 
      marginBottom: 50, 
      marginHorizontal: 50,
      borderRadius: 10,
      justifyContent: 'center'
      }}>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => onChangeText(text)}
        returnKeyType={"search"}
        placeholder={"e.g. banana"}
        value={value}
        onSubmitEditing={() => handleFood().then((value) => setResults(value))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    border: 1,
    //marginBottom: 50,
    //marginHorizontal: 50,
    textAlign: "center",
  },
});

export default SearchBar;
