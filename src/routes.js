import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/login";
import Main from "./pages/main";
import User from "./pages/user";
import Cadastro from "./pages/cadastro";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen name="user" component={User} />
      <Stack.Screen name="cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}
