import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

export default function EmployeeListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);

  const fetchEmployeeData = async () => {
    try {
      const existingEmployees = await AsyncStorage.getItem("employees");
      if (existingEmployees) {
        const employeesData = JSON.parse(existingEmployees);
        setEmployees(employeesData);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const toggleFavorite = async (employeeId) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === employeeId) {
        return { ...employee, isFavorite: !employee.isFavorite };
      }
      return employee;
    });

    setEmployees(updatedEmployees);

    await AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <View style={styles.avatarContainer}>
        <Avatar
          title={`${item.firstName.charAt(0)}${item.lastName.charAt(0)}`}
          size="medium"
          rounded
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        {item.isFavorite ? (
          <Icon name="star" color="gold" size={20} />
        ) : (
          <Icon name="star" color="gray" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );

  const sortedEmployees = [...employees].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchEmployeeData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedEmployees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  avatarContainer: {
    marginRight: 16,
    backgroundColor: "green",
    borderRadius: 50,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 14,
    color: "#555",
  },
});
