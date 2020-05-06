import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Board } from '../components';
import { dispatchUnsolvedBoard } from '../store/actions/sugoku_actions';

export default ({ route }) => {
  const { uname, difficulty } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchUnsolvedBoard(difficulty));
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.centerText}>
          Welcome! <Text style={styles.bold}>{uname}</Text>
        </Text>
        <Text style={styles.centerText}>
          Difficulty: <Text style={styles.bold}>{difficulty}</Text>
        </Text>
      </View>
      <Board uname={uname} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 5,
    margin: 10,
  },
  centerText: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
