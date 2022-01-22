import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline } from 'react-native-paper';

import {
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from '../firebase';

const Upload = () => {
  useEffect(() => {
    fetchSignInMethodsForEmail(auth, auth.currentUser.email).then((methods) => {
      console.log(methods);
    })
  }, [])

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Upload it is</Headline>
    </View>
  )
}

export default Upload

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
