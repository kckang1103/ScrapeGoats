import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline, Text } from 'react-native-paper';

import {
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from '../firebase';
import { set } from 'react-native-reanimated';

const History = () => {

  const [history, setHistory] = useState();

  useEffect(() => {
    fetch("./history").then(
      res => res.json()
    ).then((data) => {
      setHistory(data);
      console.log(data);
    })
  }, [])

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>History it is</Headline>
      <Text>{history}</Text>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    color: 'black'
  }
})
