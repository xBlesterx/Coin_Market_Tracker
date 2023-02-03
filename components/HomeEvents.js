import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { COLORS, FONTS, SIZES } from "../constants";

const RenderItem = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        height: 130,
        padding: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        elevation: 10,
        overflow: "hidden",
      }}
      onPress={() => {
        Linking.openURL(item.url);
      }}
    >
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.body5, fontSize: 12, color: "#5d2dfd" }}>
            {item.kind}
          </Text>
          <Text style={{ ...FONTS.body4, fontSize: 12, color: "#5d2dfd" }}>
            {item.source.title}
          </Text>
        </View>
        <View style={{ width: 165 }}>
          <Text style={{ ...FONTS.h3, color: "black" }} numberOfLines={5}>
            <Text style={{ ...FONTS.h2, color: "#5d2dfd" }}>
              {item.title.split(" ").slice(0, 1).join(" ")}{" "}
            </Text>
            {item.title.split(" ").slice(1).join(" ")}
          </Text>
        </View>
      </View>
      <View style={{ bottom: 0, position: "absolute", right: 5 }}>
        <Text style={{ ...FONTS.body5, fontSize: 10, color: "#5d2dfd" }}>
          {item.published_at}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeEvents = () => {
  const [news, setNews] = useState();
  const numColumns = 2;
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://cryptopanic.com/api/v1/posts/?auth_token=1515bea885aec633a4141d04a365bd990fa54a4d&public=true",
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data.coins[0]);
        const data = response.data.results;
        setNews(data);
      })
      .catch(function (error) {
        console.error(error);
      });
    // console.log(news);
  }, []);
  return (
    <View style={{ paddingBottom: 450 }}>
      <Text
        style={{ marginLeft: SIZES.padding, color: "#5d2dfd", ...FONTS.h2 }}
      >
        Trending News
      </Text>
      <FlatList
        style={{ margin: 5 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={news}
        renderItem={(item, index) => (
          <RenderItem item={item.item} index={index} />
        )}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
      />
    </View>
  );
};

export default HomeEvents;
