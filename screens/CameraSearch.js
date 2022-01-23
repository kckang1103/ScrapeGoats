import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Avatar, Button, IconButton, List, Text } from 'react-native-paper';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {
  LineChart
} from "react-native-chart-kit";

import { auth, storage } from '../firebase'
import { Camera } from 'expo-camera';

const API_KEY = 'AIzaSyC_omoFuuCwY1Bp5F0hGrcMPxzm7cHflsk';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const CameraSearch = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [graphData, setGraphData] = useState();

  const [currentPicture, setCurrentPicture] = useState(null);

  const cam = useRef(Camera);

  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [permissions, setPermissions] = useState(false);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);


  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

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

  async function callGoogleVisionAsync(image) {
    const body = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: 'LOGO_DETECTION',
              maxResults: 1,
            },
            // {
            //   type: 'TEXT_DETECTION',
            //   maxResults: 1,
            // },
            {
              type: 'LABEL_DETECTION',
              maxResults: 1,
            },
          ],
        },
      ],
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    const responses = result.responses;

    const recursiveSearch = (obj, searchKey, results = []) => {
      const r = results;
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (key === searchKey && typeof value !== 'object') {
          r.push(value);
        } else if (typeof value === 'object') {
          recursiveSearch(value, searchKey, r);
        }
      });
      return r;
    };

    let results = recursiveSearch(responses, 'description');

    return results;
  }

  const takePictureAsync = async () => {
    setLoading(true);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
        setLoading(false);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };


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

  const onItemPressed = (item) => {
    //TODO: call Twitter API on searchQuery here
    var params = {
      data: item
    }

    console.log('item selected: ', item)

    // if (searchQuery != "") {
    axios.post('https://scrapegoats.uc.r.appspot.com/api/query', params)
      .then(function (response) {
        console.log(response.data);

        const data = response.data;
        
        let dates = []
        let dataPoints = []
        for (let i = 0; i < data.length; i++) {
          dates.push(data[i]['created_at']);
          dataPoints.push(data[i]['sentiment']['score']);
        }

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
      });
    // } else {
    //   alert("The search query cannot be empty")
    // }

  }

  return (
    <ScrollView>
      {permissions === false ? (
        <View style={styles.container}>
          <Button onPress={askPermissionsAsync}>Allow Camera Access</Button>
        </View>
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <Button onPress={takePictureAsync}>Take a picture</Button>
          {/* <IconButton
            icon="camera"
            size={40}
            onPress={takePictureAsync}
          /> */}
          {/* {status && <Text style={styles.text}>{status}</Text>} */}
          {(loading) && <Text style={styles.text}>Evaluating...</Text>}
          {(status && !loading) &&
            <List.Section>
              <List.Accordion
                title="Results"
                expanded={expanded}
                onPress={handlePress}>
                {status.map((item) => {
                  return <List.Item onPress={() => { onItemPressed(item) }} title={item} key={Math.random()} />
                })}
              </List.Accordion>
            </List.Section>}
            {graphData && <LineChart 
              data={graphData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />}
        </>
      )}
    </ScrollView>
  );
}

export default CameraSearch

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    marginTop: '70%',
    //marginBottom: 'auto',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // flipButton: {
  //   alignSelf: 'flex-end',
  //   margin: 20
  // },
  // pictureButton: {
  //   marginRight: "12%",
  //   justifyContent: "center",
  //   alignSelf: 'flex-end',
  // },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});
