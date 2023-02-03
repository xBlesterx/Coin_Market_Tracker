import React, { useEffect, useState } from "react";
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import axios from "axios";
import { Provider } from "react-redux";
import { setcrypto } from "./features/cryptoSlice";
import { store } from "./store";

const Stack = createStackNavigator();
const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Bold": Roboto_700Bold,
    "Roboto-Black": Roboto_900Black,
  });

  if (!fontsLoaded) return <AppLoading />;
  else {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"Home"}
          >
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
            <Stack.Screen name="Transaction" component={Transaction} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
};

export default App;
