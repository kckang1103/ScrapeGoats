import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform
} from "react-native";
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import * as Google from 'expo-google-app-auth';

import Logo from "../assets/transparentLogo.png"
import { onSignInGoogle } from "../util";
import { auth } from "../firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Navigation")
      }
    })

    return unsubscribe
  }, [])

  const handleRegister = () => {
    navigation.replace("Register")
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleForgotPassword = () => {
    navigation.replace("ForgotPassword");
  }

  const handleGoogle = () => {

    if (Platform.OS === 'web') {
      console.log('web it is')
      const googleAuthProvider = new GoogleAuthProvider();

      signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      console.log('mobile it is in login')
      try {

        let config = {
          androidClientId: '780149071742-gsrs0ma6omrdj3m3j6uc8g2ikiu7ng3a.apps.googleusercontent.com',
          iosClientId: '780149071742-58rq35rf29hqde7a1unb588vocj66f23.apps.googleusercontent.com',
          scopes: ['profile', 'email']
        }

        Google.logInAsync(config).then((result) => {
          console.log(result)
          onSignInGoogle(result);
          console.log(result);
        }).catch(error => {
          console.log(error.message);
        })

      } catch (e) {
        return { error: true };
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Headline style={styles.headline}>Scrape Goats</Headline> */}
      <Image style={{width: 300, height: 250}} source={require("../assets/transparentLogo.png")}/>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button onPress={handleLogin} mode="contained" style={styles.button}>
          Login
        </Button>
        <Button onPress={handleForgotPassword}>
          Forgot password?
        </Button>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <Button onPress={handleGoogle} icon="google" mode="outlined" style={styles.buttonAlt}>
          Continue with Google
        </Button>
        <Button onPress={handleRegister} mode="outlined" style={styles.buttonCreateNewAccount}>
          Create new account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  headline: {
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 40,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    marginVertical: 20,
    width: "100%",
    padding: 4,
    alignItems: "center",
  },
  buttonAlt: {
    marginTop: 10,
    width: "100%",
    padding: 4,
    alignItems: "center"
  },
  buttonCreateNewAccount: {
    marginTop: 40,
    width: "100%",
    padding: 4,
    alignItems: "center"
  },
  divider: {
    backgroundColor: '#d3d3d3',
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  dividerContainer: {
    marginVertical: 15,
    flexDirection: 'row'
  },
  dividerText: {
    alignSelf: 'center',
    paddingHorizontal: 15
  },
});
