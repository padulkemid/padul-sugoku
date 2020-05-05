import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { dispatchSolvedBoard, dispatchValidation } from '../store/actions/sugoku_actions';

export default () => {
  const { unsolvedBoard, solvedBoard, validated } = useSelector((state) => state.sugokuReducer);
  const [board, setBoard] = useState([]);
  const [validation, setValidation] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let undoGame = unsolvedBoard;

  useEffect(() => {
    setBoard(unsolvedBoard);
    setValidation(validated);
  }, [unsolvedBoard, validated]);

  const solveBoard = () => {
    dispatch(dispatchSolvedBoard(unsolvedBoard));
    setBoard(solvedBoard);
  };

  const updateBoard = (i, j, val) => {
    console.log({ i, j, val });
  };

  const validateBoard = () => {
    dispatch(dispatchValidation(board));
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
                    <TextInput
                      onChangeText={(content) => updateBoard(i, j, content)}
                      style={styles.cell}
                      maxLength={1}></TextInput>
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
        <Text style={styles.buttonText}>Solve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={undoBoard}>
        <Text style={styles.buttonText}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={validateBoard}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
      <Text style={styles.validation}>{validation ? '- solved -' : '- unsolved -'}</Text>
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
  buttonText: {
    padding: 5,
    color: 'white',
    width: 100,
    textAlign: 'center',
  },
  validation: {
    marginTop: 20,
    fontSize: 20,
    fontStyle: 'italic',
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
