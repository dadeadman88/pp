import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';

export default SafeAreaContainer = props => {
  const {
    safeArea = true,
    mode = 'dark',
    backgroundColor = 'transparent',
    style = {},
  } = props;

  return (
    <View style={{flex: 1, backgroundColor: '#fff', ...style}}>
      <StatusBar
        translucent={true}
        backgroundColor={backgroundColor}
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
      />

      {/* {safeArea ? ( */}
      <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
      {/* ) : (
        <>{props.children}</>
      )} */}
    </View>
  );
};

export const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 999,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color="#fff" size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
});
