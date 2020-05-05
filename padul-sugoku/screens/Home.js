import React, { useState } from 'react';
import { Picker, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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
    } else if (!difficulty.length) {
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
      <Text>
        Please input your <Text style={styles.bold}>username</Text>
      </Text>
      <TextInput
        onChangeText={(content) => handleUnameInput(content)}
        style={styles.input}></TextInput>
      <Text>Select your difficulty</Text>
      <RNPickerSelect
        onValueChange={(value) => handleDifficulty(value)}
        style={styles.picker}
        items={[
          { label: 'Easy peasy', value: 'easy' },
          { label: 'Mediumm huhh', value: 'medium' },
          { label: 'uLtRa HAAAARD', value: 'hard' },
        ]}
      />
      <TouchableOpacity onPress={startGame}>
        <Text style={styles.button}> Start </Text>
      </TouchableOpacity>
      <Text> Your username : {uname}</Text>
      <Text> Your difficulty : {difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 100,
  },
  picker: {
    margin: 10,
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    margin: 15,
    padding: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  bold: {
    fontWeight: 'bold',
  },
});
