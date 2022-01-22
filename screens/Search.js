import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Headline, Searchbar } from 'react-native-paper';

import { auth } from '../firebase';

const Search = () => {

  // search by search bar
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const onSearchPressed = () => {
    //TODO: call Twitter API on searchQuery here
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
