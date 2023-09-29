import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("AddEmployee")}
      >
        <Text style={styles.text}>Add Employee</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84d67e",
  },
  pressable: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 2,
    paddingHorizontal: 40,
    borderRadius: 2,
  },
  text: {
    color: "#fafafa",
    fontSize: 15,
    fontWeight: "bold",
  },
});
