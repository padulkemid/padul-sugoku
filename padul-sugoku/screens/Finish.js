import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

export default ({ route }) => {
  const { uname } = route.params;
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('leaderboard')
      .then((req) => JSON.parse(req))
      .then((unames) => setLeaderboards(unames));
  }, []);

  return (
    <View style={styles.container}>
      <Text> ⭐️ The game is finished ⭐️</Text>
      <Text style={styles.unameBanner}>Thank you! {uname}</Text>
      {leaderboards.length ? (
        <View style={styles.leaderboards}>
          <Text style={styles.unameBanner}>- Leaderboards 🤩 -</Text>
          {leaderboards.map((uname, i) => (
            <Text key={i} style={styles.unames}>
              {i + 1}.{` ${uname}`}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={{ fontStyle: 'italic' }}> No one fancy a game yet 😖</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unameBanner: {
    fontSize: 25,
    fontStyle: 'italic',
  },
  leaderboards: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  unames: {
    margin: 2,
    padding: 3,
    fontStyle: 'italic',
  },
});
