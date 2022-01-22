import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, Headline } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

import { auth, storage } from '../firebase'

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const defaultProfilePicture = "../assets/inzik.jpeg";
  const [currentProfilePicture, setCurrentProfilePicture] = useState(defaultProfilePicture);

  useEffect(() => {
    const pictureRef = ref(storage, 'users/' + auth.currentUser.uid + '/profilePicture');
    getDownloadURL(pictureRef)
      .then((url) => {
        console.log("trying to console log current profile picture", currentProfilePicture);
        setCurrentProfilePicture(url);
        updateProfile(auth.currentUser, { photoURL: url }).then(()=> {
          console.log('updating photoURL 1', url);
        })
      })
      .catch((error) => {
        console.log(error.message);
        setCurrentProfilePicture(auth.currentUser.photoURL);
        //setCurrentProfilePicture(defaultProfilePicture);
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [profilePicture, auth.currentUser])

  const openPickerAndUpload = async () => {
    console.log("trying to edit picture")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      setCurrentProfilePicture(result.uri);
      // updateProfile(auth.currentUser, { photoURL: result.uri }).then(() => {
      //   console.log("updating photo url 2");
      // })

      const storageRef = ref(storage, 'users/' + auth.currentUser.uid + '/profilePicture');

      uploadBytes(storageRef, blob).then(() => {
        console.log('Uploaded profile image successfully');
      }).then(() => {
        if (!result.cancelled) {
          setProfilePicture(result.uri);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    }).catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={200} source={{ uri: currentProfilePicture }} />
        <TouchableOpacity style={styles.edit} onPress={openPickerAndUpload}>
          <Avatar.Icon size={30} icon="image-edit" />
        </TouchableOpacity>
      </View>
      <Headline style={styles.headline}>Name: {auth.currentUser?.displayName}</Headline>
      <Headline style={styles.headline}>Email: {auth.currentUser?.email}</Headline>
      <Button onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    marginBottom: 50,
  },
  headline: {
    color: 'black'
  },
  edit: {
    margin: 5,
    position: "absolute",
    top: 155,
    left: 155,
  }
})
