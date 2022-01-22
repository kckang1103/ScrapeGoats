import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline } from 'react-native-paper';

import {
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from '../firebase';

const History = () => {

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>History it is</Headline>
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
