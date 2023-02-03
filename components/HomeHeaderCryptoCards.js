import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { COLORS, dummyData, FONTS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
const RenderItem = ({ item, index, BTCPrice }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 5 }}>
      <TouchableOpacity
        style={{
          height: 110,
          width: 150,
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginRight: 10,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          shadowOpacity: 10,
          elevation: 10,
        }}
        onPress={() => navigation.navigate("CryptoDetail", item.item.id)}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={{
                  uri: item.item.large,
                }}
                style={{ width: 30, height: 30, marginRight: 5 }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>
                {item.item.name.split(" ").slice(0, 2).join(" ")}
              </Text>
              <Text style={{ ...FONTS.body5 }}>
                {item.item.symbol.toUpperCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h2 }}>
              ${(item.item.price_btc.toLocaleString() * BTCPrice).toFixed(3)}
            </Text>
            <Text
              style={{
                // color: item.price_change_percentage_24h < 0 ? "red" : "green",
                marginTop: 2,
              }}
            >
              {/* {item.price_change_percentage_24h.toFixed(2)}% */}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const HomeHeaderCryptoCards = ({ data, BTCprice }) => {
  const [BTCPrice, setBTCPrice] = useState();
  useEffect(() => {
    const optionsForBTCPrice = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      params: {
        ids: "bitcoin",
        vs_currency: "usd",
      },
    };

    axios
      .request(optionsForBTCPrice)
      .then(function (response) {
        //console.log(response.data.coins[0]);
        const data = response.data.bitcoin.usd;
        setBTCPrice(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Text
        style={{ marginLeft: SIZES.padding, color: COLORS.white, ...FONTS.h2 }}
      >
        Trending
      </Text>
      <FlatList
        style={{}}
        contentContainerStyle={{
          marginTop: SIZES.base,
        }}
        data={data}
        renderItem={(item, index) => (
          <RenderItem item={item.item} index={index} BTCPrice={BTCPrice} />
        )}
        keyExtractor={(item) => `${item.item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeHeaderCryptoCards;
