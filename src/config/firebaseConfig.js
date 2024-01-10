// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDscIzyfqcKwZUhFZVLfUENbkh7AFbphi4",
  authDomain: "exgirl-10580.firebaseapp.com",
  projectId: "exgirl-10580",
  storageBucket: "exgirl-10580.appspot.com",
  messagingSenderId: "697968023298",
  appId: "1:697968023298:web:94b5ff43952625f84a541b",
  measurementId: "G-VFME8YGD2T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
