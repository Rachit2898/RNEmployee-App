import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Home";
import AddEmployeeScreen from "./src/AddEmployee";
import EmployeeListScreen from "./src/EmployeeList";
import Drawers from "./src/Components/Drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStackNavigator() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAndNavigate = async () => {
      try {
        const existingEmployees = await AsyncStorage.getItem("employees");
        if (existingEmployees) {
          navigation.navigate("EmployeeList");
        }
      } catch (error) {
        console.error("Error checking AsyncStorage:", error);
      }
    };

    checkAndNavigate();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
      <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <Drawers {...props} />}
            screenOptions={{
              drawerType: "front",
            }}
          >
            <Drawer.Screen
              options={{
                title: null,
                headerStyle: {
                  backgroundColor: "green",
                },
              }}
              name="Homes"
              component={MainStackNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
