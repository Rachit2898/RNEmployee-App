import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddEmployeeScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");

  function generateUniqueId(length) {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let uniqueId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters.charAt(randomIndex);
    }

    return uniqueId;
  }

  const saveEmployee = async () => {
    if (!firstName || !lastName || !jobTitle || !salary) {
      // Show an alert if any field is empty
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const employeeId = generateUniqueId(5);

    const newEmployee = {
      id: employeeId,
      firstName,
      lastName,

      jobTitle,
      salary,
      isFavorite: false,
    };

    try {
      const existingEmployees = await AsyncStorage.getItem("employees");
      const employees = existingEmployees ? JSON.parse(existingEmployees) : [];

      employees.push(newEmployee);

      await AsyncStorage.setItem("employees", JSON.stringify(employees));

      navigation.navigate("EmployeeList");
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Employee Details</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <Pressable style={styles.pressable} onPress={saveEmployee}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0", // Light gray background
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "green",
  },
  input: {
    height: 40,
    borderColor: "green", // Green border color
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  pressable: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 2,
  },
  text: {
    color: "#fafafa",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
