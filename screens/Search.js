import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Caption, Headline, Searchbar } from 'react-native-paper';
import axios from 'axios';
import {
  LineChart
} from "react-native-chart-kit";


import { auth } from '../firebase';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(164, 116, 212, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const Search = () => {

  // search by search bar
  const [sentiment, setSentiment] = useState('');

  const [graphData, setGraphData] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const onSearchPressed = () => {
    //TODO: call Twitter API on searchQuery here
    var params = {
      data: searchQuery
    }

    console.log("params", params);

    // if (searchQuery != "") {
    //TODO: CHange later
    axios.post('https://scrapegoats.uc.r.appspot.com/api/query', params)
      .then(function (response) {
        console.log(response.data);

        const data = response.data;

        let dates = new Set()
        let dataPoints = []
        for (let i = 0; i < data.length; i++) {
          dates.add(data[i]['created_at'].split('-')[0]);
          dataPoints.push(data[i]['sentiment']['score']);
        }

        dates.add("2021");
        dates = Array.from(dates)
        console.log(dates);

        const graphDataTemp = {
          labels: dates,
          datasets: [
            {
              data: dataPoints
            }
          ]
        }

        setGraphData(graphDataTemp);
      })
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
    // } else {
    //   alert("The search query cannot be empty")
    // }

    console.log(searchQuery);
  }

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchBar}
        placeholder="Enter a term or a phrase"
        onChangeText={onChangeSearch}
        onIconPress={onSearchPressed}
        value={searchQuery}
      />
      {/* {sentiment ? <Text>This is the sentiment: {sentiment}</Text> : <Text>Loading</Text>} */}
      {graphData && <LineChart
        data={graphData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />}
    <Caption style={{ textAlign: 'center' }}>Score of the sentiment ranges from -1.0 (very negative) to 1.0 (very positive) </Caption>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    color: 'black'
  },
  searchBar: {
    marginTop: 20,
  }
})
