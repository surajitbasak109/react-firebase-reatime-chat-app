import React from 'react';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTAKxns0b4GhQaEo-z3p0zCN9i85JjTQY',
  authDomain: 'realtime-chat-app-ab919.firebaseapp.com',
  databaseURL: 'https://realtime-chat-app-ab919.firebaseio.com',
  projectId: 'realtime-chat-app-ab919',
  storageBucket: 'realtime-chat-app-ab919.appspot.com',
  messagingSenderId: '935613390456',
  appId: '1:935613390456:web:750099c430b6fe074a978d',
  measurementId: 'G-NHQQ3V79YM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
