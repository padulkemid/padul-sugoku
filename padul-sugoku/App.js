import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Board } from './components';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Padoel sudoku!</Text>
      <Text>
        based on <Text style={{ fontWeight: 'bold' }}>Sugoku!</Text>{' '}
      </Text>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
