import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Headline, Text } from 'react-native-paper';
import axios from 'axios';
import { WebView } from 'react-native-webview';


import {
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from '../firebase';
import { set } from 'react-native-reanimated';

const History = () => {

  const [history, setHistory] = useState();
  const [htmlContent, setHtmlContent] = useState();

  useEffect(() => {
    fetch("./history").then(
      res => res.json()
    ).then((data) => {
      setHistory(data);
      console.log(data);
    })
  }, [])

  const onTestPressed = () => {
    //TODO: call Twitter API on searchQuery here

    //TODO: Change this later maybe
    axios.get('https://scrapegoats.uc.r.appspot.com/api/plot')
      .then(function (response) {
        console.log(response);

        setHtmlContent(response.data);
        //Perform action based on response
      })
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
  }


  return (
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
      />
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
