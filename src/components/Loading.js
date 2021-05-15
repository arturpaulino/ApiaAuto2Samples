import React from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';

import Theme from '../theme/theme';


const Loading = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.PaperColor} />

      <ActivityIndicator color={Theme.PrimaryColor} size={60} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PaperColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
