import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Menu } from "../assets/icons";

import { AsyncStorage } from "react-native";
import { IconButton } from "react-native-paper";

import styled from "styled-components/native";

import HomeScreen from "../screens/Home";
import SignUpScreen from "../screens/SignUp";
import LogInScreen from "../screens/LogIn";
import ArticleScreen from "../screens/Article";

import Sidebar from "../components/Sidebar";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = (props: any) => {
  const [loggedUser, setUser] = useState<String | null>(null);
  const [rootPath, setRootPath] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  AsyncStorage.getItem("logged_in").then((data) => {
    setUser(data);
    setLoading(false);
  });

  return (
    <>
      {!loading &&
        (loggedUser ? (
          <Drawer.Navigator
            drawerContent={(props: any) => (
              <Sidebar
                {...props}
                rootPath={rootPath}
                selected={selected}
                setUser={setUser}
              />
            )}
            drawerType="front"
            drawerStyle={{ paddingTop: -4 }}
          >
            <Drawer.Screen
              name="Welcome"
              component={UserNavigator}
              initialParams={setRootPath}
            />
          </Drawer.Navigator>
        ) : (
          <GuestNavigator initialParams={{ setUser: setUser }} />
        ))}
    </>
  );
};

interface UserProps {
  navigation: any;
  route: any;
  setRootPath: Function;
  setSelected: Function;
}

const GuestNavigator = ({ initialParams: { setUser } }: any) => (
  <Stack.Navigator initialRouteName="LogIn" headerMode="none">
    <Stack.Screen
      name="LogIn"
      component={LogInScreen}
      initialParams={{ setUser }}
    />

    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      initialParams={{ setUser }}
    />
  </Stack.Navigator>
);

const UserNavigator = ({
  navigation,
  route,
  setRootPath,
  setSelected,
}: UserProps) => (
  <Stack.Navigator
    initialRouteName="Home"
    mode="modal"
    headerMode="float"
    screenOptions={{
      headerLeft: () => (
        <StyledIconButton
          color="#000"
          icon={() => <Menu />}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitleContainerStyle: { justifyContent: "center" },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ ...route.params }}
    />
    <Stack.Screen
      name="Article"
      component={ArticleScreen}
      initialParams={{ ...route.params }}
      options={{
        title: "",
        headerTitleContainerStyle: {},
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;

const StyledIconButton = styled(IconButton)`
  min-width: 0;
  left: 4px;
`;
