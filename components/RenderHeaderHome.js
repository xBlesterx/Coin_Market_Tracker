import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { cloneElement, useEffect, useState } from "react";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HomeHeaderCryptoCards from "./HomeHeaderCryptoCards";
import axios from "axios";

const RenderHeaderHome = () => {
  const [trending, setTrending] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/search/trending",
      //   params: {
      //     vs_currency: "usd",
      //     page: "1",
      //     per_page: "10",
      //     order: "market_cap_desc",
      //   },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data.coins[0]);
        const data = response.data.coins;
        setTrending(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ width: "100%", height: 250, ...styles.shadow }}>
      <ImageBackground
        source={images.banner}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {/*Header section*/}
        <View
          style={{
            marginTop: SIZES.padding * 2,
            width: "100%",
            alignItems: "flex-end",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => console.log("Notification is pressed")}
          >
            <Image
              source={icons.notification_white}
              resizeMode="contain"
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
        </View>
        {/*Balance*/}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            Your Portfolio Balance
          </Text>
          <Text
            style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1 }}
          >
            ${dummyData.portfolio.balance}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
            {dummyData.portfolio.changes} Last 24 hours
          </Text>
        </View>
        {/*Trading*/}
        <View style={{ button: "30%" }}>
          <HomeHeaderCryptoCards data={trending} />
        </View>
      </ImageBackground>
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

export default RenderHeaderHome;
