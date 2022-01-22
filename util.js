import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
  signOut,
  FacebookAuthProvider
} from "firebase/auth";

import { auth } from "./firebase";

export const onSignInGoogle = googleUser => {
  console.log('Google Auth Response from util.js', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqualGoogle(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      signInWithCredential(auth, credential).then(() => {
        console.log('user signed in')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    } else {
      console.log('User is already signed-in Firebase.');
    }
  });
}

const isUserEqualGoogle = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

export const onSignInFacebook = response => {
  console.log("trying to login through facebook from util")
  if (response.type === 'success') {
    // User is signed-in Facebook.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      console.log('firebaseUser', firebaseUser)
      // Check if we are already signed-in Firebase with the correct user.
      //if (!isUserEqualFacebook(response.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        const credential = FacebookAuthProvider.credential(
          response.token);

        // Sign in with the credential from the Facebook user.
        signInWithCredential(auth, credential)
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
          });
      // } else {
      //   // User is already signed-in Firebase with the correct user.
      // }
    });
  }
}

const isUserEqualFacebook = (facebookAuthResponse, firebaseUser) => {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}