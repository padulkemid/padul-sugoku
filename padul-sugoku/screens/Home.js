import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default ({ navigation }) => {
  const [uname, setUname] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleUnameInput = (val) => {
    setUname(val);
  };

  const handleDifficulty = (val) => {
    setDifficulty(val);
  };

  const startGame = () => {
    // check uname

    if (!uname.length) {
      Alert.alert(
        'Oh my woaw!',
        'Please insert your username!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else if (!difficulty || !difficulty.length) {
      Alert.alert(
        'Yikes!',
        'Please select your difficulty!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('Game', {
        uname,
        difficulty,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/sudoku.png')} style={styles.image}></Image>
      <Text style={styles.centerText}>
        Welcome! {'\n'} Please input your <Text style={styles.bold}>username</Text>
      </Text>
      <TextInput
        placeholder="username.."
        onChangeText={(content) => handleUnameInput(content)}
        style={styles.input}></TextInput>
      <Text>Select your difficulty</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{ label: 'Select one level..', value: null }}
          onValueChange={(value) => handleDifficulty(value)}
          items={[
            { label: 'Easy peasy', value: 'easy' },
            { label: 'Mediumm huhh', value: 'medium' },
            { label: 'uLtRa HAAAARD', value: 'hard' },
          ]}
        />
      </View>
      <TouchableOpacity onPress={startGame}>
        <Text style={styles.button}> Start </Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={{ margin: 5 }}> Your username</Text>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>{uname}</Text>
        <Text style={{ margin: 5 }}> Your difficulty</Text>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>{difficulty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 150,
    width: 150,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'white',
    width: 150,
  },
  picker: {
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    color: 'white',
    width: 200,
    backgroundColor: 'red',
  },
  button: {
    color: 'white',
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    textAlign: 'center',
    backgroundColor: 'red',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  bold: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    padding: 10,
  },
});
