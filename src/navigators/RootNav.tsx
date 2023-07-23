import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "../screens/home";
import People from "../screens/People";

const RootStack = createStackNavigator<propsStackNavegation>();

import screenOpts from "../utils/defaultScreenOpts";
import { propsStackNavegation } from "./propsStack";

const RootNav: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={screenOpts}>
      <RootStack.Screen name='Home' component={Home} />
      <RootStack.Screen name='People' component={People} />
    </RootStack.Navigator>
  );
};

export default RootNav;
