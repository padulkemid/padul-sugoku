import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { dispatchSolvedBoard, dispatchValidation } from '../store/actions/sugoku_actions';

export default (props) => {
  const { unsolvedBoard, solvedBoard, validated } = useSelector((state) => state.sugokuReducer);
  const { uname } = props;
  const [board, setBoard] = useState([]);
  const [validation, setValidation] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let undoGame = unsolvedBoard;

  useEffect(() => {
    dispatch(dispatchSolvedBoard(unsolvedBoard));
    setBoard(unsolvedBoard);
    setValidation(validated);
  }, [unsolvedBoard, validated]);

  const solveBoard = () => {
    setBoard(solvedBoard);
  };

  const updateBoard = (i, j, val) => {
    console.log({ i, j, val });
  };

  const validateBoard = () => {
    dispatch(dispatchValidation(board));
    Alert.alert(
      'Yeap!',
      `Board has been validated! \n Should the game finished it'll reset its state`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const finishGame = () => {
    if (!validation) {
      Alert.alert(
        'Whoops!',
        'Please validate the game first, or finish the game!',
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
      AsyncStorage.getItem('leaderboard')
        .then((req) => JSON.parse(req))
        .then((unames) => {
          let tempUnames = unames;
          tempUnames.push(uname);

          return AsyncStorage.setItem('leaderboard', JSON.stringify(tempUnames));
        })
        .then((_) => navigation.navigate('Finish', { uname }));
    }
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
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={solveBoard}>
          <Text style={styles.buttonText}>Solve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={validateBoard}>
          <Text style={styles.buttonText}>Validate</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={undoBoard}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={finishGame}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.validation}>Result</Text>
      <Text style={styles.validation}>{validation ? '- solved -' : '- Not yet solved -'}</Text>
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
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 2,
    margin: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
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
