import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Headline } from 'react-native-paper';

import ContentCard from '../components/ContentCard';

const Home = () => {

  return (
    <ScrollView contentContainerStyle={styles.content}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Headline style={styles.headline}>Home it is</Headline>
      </View>
      <ContentCard style={styles.contentCard} />
      <ContentCard style={styles.contentCard} />
      <ContentCard style={styles.contentCard} />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 4,
  },
  contentCard: {
    flex: 1,
    marginTop: 50
  },
  headline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  }
})
