import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const Drawer = ({ navigation }) => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalFavoriteEmployees, setTotalFavoriteEmployees] = useState(0);

  const fetchEmployeeData = async () => {
    try {
      const existingEmployees = await AsyncStorage.getItem("employees");
      if (existingEmployees) {
        const employeesData = JSON.parse(existingEmployees);
        setTotalEmployees(employeesData.length);

        const favoriteEmployees = employeesData.filter(
          (employee) => employee.isFavorite
        );
        setTotalFavoriteEmployees(favoriteEmployees.length);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useFocusEffect(() => {
    fetchEmployeeData();
  });

  return (
    <DrawerContentScrollView style={styles.drawerContent}>
      <View style={styles.container}>
        <Text style={styles.count}>Total Employees: {totalEmployees}</Text>
        <Text style={styles.count}>
          Total Favorite Employees: {totalFavoriteEmployees}
        </Text>
        <View style={styles.divider} />
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.text}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("AddEmployee")}
        >
          <Text style={styles.text}>Add Employee</Text>
        </Pressable>
        {totalEmployees > 0 ? (
          <Pressable
            style={styles.pressable}
            onPress={() => navigation.navigate("EmployeeList")}
          >
            <Text style={styles.text}>Employees List</Text>
          </Pressable>
        ) : null}
      </View>
    </DrawerContentScrollView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  container: {
    padding: 16,
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
  },
  count: {
    color: "green",
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "green",
    marginBottom: 5,
  },
});
