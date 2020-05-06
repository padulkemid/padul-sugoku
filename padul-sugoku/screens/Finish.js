import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ route }) => {
  const { uname } = route.params;
  return (
    <View style={styles.container}>
      <Text> ⭐️ The game is finished ⭐️</Text>
      <Text style={styles.unameBanner}>Thank you! {uname}</Text>
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
});
