import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useState, useEffect } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkj8VL_IhmvC57Y7gV1MRIz8nGPJpRtU",
  authDomain: "logfire-8e9dc.firebaseapp.com",
  projectId: "logfire-8e9dc",
  storageBucket: "logfire-8e9dc.appspot.com",
  messagingSenderId: "559876978472",
  appId: "1:559876978472:web:0dca48c1bd0feac3bdc21d",
  measurementId: "G-FD9T3949LD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// SignIn component
const SignIn = ({ email, password, setEmail, setPassword, handleSignIn }) => (
  <View style={styles.authContainer}>
    <Text style={styles.title}>Sign In</Text>
    <TextInput
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      placeholder="Email"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      secureTextEntry
    />
    <View style={styles.buttonContainer}>
      <Button title="Sign In" color="#3498db" onPress={handleSignIn} />
    </View>
  </View>
);

// SignUp component
const SignUp = ({ email, password, setEmail, setPassword, handleSignUp }) => (
  <View style={styles.authContainer}>
    <Text style={styles.title}>Sign Up</Text>
    <TextInput
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      placeholder="Email"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      secureTextEntry
    />
    <View style={styles.buttonContainer}>
      <Button title="Sign Up" color="#3498db" onPress={handleSignUp} />
    </View>
  </View>
);

// AuthenticatedScreen component
const AuthenticatedScreen = ({ user, handleSignOut }) => (
  <View style={styles.authContainer}>
    <Text style={styles.title}>Welcome</Text>
    <Text style={styles.emailText}>{user.email}</Text>
    <Button title="Log Out" onPress={handleSignOut} color="#e74c3c" />
  </View>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unSubscribe();
  }, [auth]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error('SignIn error:', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully!');
    } catch (error) {
      console.error('SignUp error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('SignOut error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleSignOut={handleSignOut} />
      ) : isLogin ? (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
        />
      ) : (
        <SignUp
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
        />
      )}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  toggleContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});