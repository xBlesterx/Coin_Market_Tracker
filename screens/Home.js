import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import RenderHeaderHome from "../components/RenderHeaderHome";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import axios, { all } from "axios";
import { useDispatch } from "react-redux";
import { setcrypto } from "../features/cryptoSlice";
import HomeEvents from "../components/HomeEvents";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingBottom: 75 }}>
        <RenderHeaderHome />
      </View>
      <View>
        <HomeEvents />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Home;
