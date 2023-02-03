import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";
import { VictoryCustomTheme } from "../styles";
import { COLORS, SIZES } from "../constants";

const ChartRender = ({ currency }) => {
  const [cryptoChart, setCryptoChart] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=360`;
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        setCryptoChart(response.data.prices);
        //console.log(response.data);
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
  }, [currency]);

  let chartData = [];
  console.log("ok");
  cryptoChart?.map((element) => {
    chartData.push({
      x: new Date(element[0]),
      y: element[1],
    });
  });
  //console.log(chartData);

  return (
    <>
      {cryptoChart && (
        <VictoryChart
          theme={VictoryCustomTheme}
          height={220}
          width={SIZES.width - 40}
        >
          <VictoryLine
            interpolation="natural"
            animate
            style={{
              data: { stroke: COLORS.secondary },
              parent: { border: "1px solid #ccc" },
            }}
            data={chartData}
          />
        </VictoryChart>
      )}
    </>
  );
};

export default ChartRender;
