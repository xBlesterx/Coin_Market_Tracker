import { useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import VictoryCustomTheme from "../styles";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import CurrencyLabel from "../components/CurrencyLabel";
import ChartRender from "../components/ChartRender";

const CryptoDetail = ({ navigation }) => {
  const { params: currencyID } = useRoute();

  const [cryptoDetails, setCryptoDetails] = useState();

  useEffect(() => {
    console.log("hello");
    const source = axios.CancelToken.source();
    const url = `https://api.coingecko.com/api/v3/coins/${currencyID}`;
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        setCryptoDetails(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled");
        } else {
          // Handle error
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, [currencyID]);
  //console.log(cryptoDetails.price_change_24h);
  function renderChart() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          alignItems: "center",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* /* Header */}
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <CurrencyLabel
                icon={cryptoDetails.image.large}
                currency={cryptoDetails.name}
                code={cryptoDetails.symbol}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h3 }}>
                ${cryptoDetails.market_data.current_price.usd}
              </Text>
              <Text style={{ ...FONTS.body3 }}>
                ${cryptoDetails.price_change_percentage_24h}
              </Text>
            </View>
          </View>
          {/* /* Chart */}
          <View style={{ marginTop: -25 }}>
            <ChartRender currency={currencyID} />
          </View>
        </View>
        {/* /* options */}
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <HeaderBar right={true} />
      <ScrollView>
        {cryptoDetails && (
          <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
            <View>{renderChart()}</View>
            <View
              style={{
                marginTop: SIZES.padding - 10,
                marginHorizontal: SIZES.radius,
                paddingHorizontal: 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow,
              }}
            >
              <Text style={{ ...FONTS.h2 }}>
                {cryptoDetails.name} Price Statistics
              </Text>
              <View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "gray",
                    paddingVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...FONTS.body3 }}>
                    {cryptoDetails.name} Price
                  </Text>
                  <Text style={{ ...FONTS.h3 }}>
                    ${cryptoDetails.market_data.current_price.usd}
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "gray",
                    paddingVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ ...FONTS.body3 }}>Price Change</Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        fontSize: 10,
                        marginLeft: 3,
                        backgroundColor: "gray",
                        borderRadius: 6,
                        paddingHorizontal: 3,
                        paddingVertical: 1,
                        color: "white",
                      }}
                    >
                      24h
                    </Text>
                  </View>
                  <Text style={{ ...FONTS.h3 }}>
                    {cryptoDetails && cryptoDetails.price_change_24h
                      ? cryptoDetails.price_change_24h
                      : "Not available"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight + 5,
    flex: 1,
    backgroundColor: COLORS.lightGray1,
  },
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

export default CryptoDetail;
