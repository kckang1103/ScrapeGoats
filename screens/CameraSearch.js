import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage } from '../firebase'
import { Camera } from 'expo-camera';


const CameraSearch = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [currentPicture, setCurrentPicture] = useState(null);

  const cam = useRef(Camera);

  const takePicture = async () => {
    console.log("pressed take blob")
    if (cam.current) {
      const options = { quality: 0.7, base4: true, skipProcessing: false };

      const picture = await cam.current.takePictureAsync(options);

      if (picture.uri) {

        setCurrentPicture(picture.uri);

        const response = await fetch(picture.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, 'users/' + auth.currentUser.uid + '/cameraSearch');

        uploadBytes(storageRef, blob).then(() => {
          console.log('Uploaded camera search image successfully');
        }).then(() => {
          const pictureRef = ref(storage, 'users/' + auth.currentUser.uid + '/profilePicture');
          getDownloadURL(pictureRef).then((url) => {
            console.log(url);
          })
        })
      }
    }
  }


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cam} style={styles.camera} type={type}>
        <Avatar.Image style={{ margin: 10, alignSelf: 'center' }} size={100} source={{ uri: currentPicture }} />
        <View style={styles.buttonContainer}>
          <IconButton onPress={() => { takePicture() }}
            style={styles.pictureButton} size={60} icon="circle-slice-8"></IconButton>
          <IconButton onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }} style={styles.flipButton} size={40} icon="sync"></IconButton>
        </View>
      </Camera>
    </View>
  );
}

export default CameraSearch

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //margin: 5,
    justifyContent: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-end',
    margin: 20
  },
  pictureButton: {
    marginRight: "12%",
    justifyContent: "center",
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
