import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { useSugokuBoard, useSugokuSolve, useSugokuValidate } from '../hooks';

export default () => {
  const game = useSugokuBoard();
  const [board, setBoard] = useState([]);
  const [validate, setValidate] = useState(false);
  const undoGame = game;

  useEffect(() => {
    setBoard(game);
  }, [game]);

  const solveBoard = () => {
    useSugokuSolve(game).then((solution) => {
      setBoard(solution);
    });
  };

  const validateBoard = () => {
    useSugokuValidate(board).then((res) => {
      if (res === 'unsolved') {
        setValidate(false);
      } else {
        setValidate(true);
      }
    });
  };

  const undoBoard = () => {
    setBoard(undoGame);
  };

  return (
    <>
      <View style={styles.board}>
        {board.length ? (
          board.map((rows, i) => (
            <View key={i} style={styles.rows}>
              {rows.map((perRow, j) => (
                <View key={j} style={styles.columns}>
                  {perRow ? (
                    <Text style={styles.cell}>{perRow}</Text>
                  ) : (
                    <TextInput style={styles.cell} value={perRow} maxLength={1}></TextInput>
                  )}
                </View>
              ))}
            </View>
          ))
        ) : (
          <ActivityIndicator size="large" color="white"></ActivityIndicator>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={solveBoard}>
        <Text style={{ padding: 5, color: 'white' }}>Solve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={undoBoard}>
        <Text style={{ padding: 5, color: 'white' }}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={validateBoard}>
        <Text style={{ padding: 5, color: 'white' }}>Validate</Text>
      </TouchableOpacity>
      <Text>Validation result : {validate ? 'solved' : 'unsolved'} </Text>
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    color: 'white',
    height: 25,
    width: 25,
    textAlign: 'center',
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columns: {
    margin: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 2,
    margin: 5,
  },
  board: {
    margin: 2,
    padding: 1,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
});
