import * as React from 'react'
import { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Colors from '../theme/theme.js'


const Splash = ({ navigation }) => {
  useEffect(() => {
    async function checkLoginInit() {
      setTimeout(
        () => { navigation.navigate('Login') }
        , 2000)
    }
    checkLoginInit();
  }, []);


  return (
    <View style={styles.container} >
      <Image source={require('../../assets/splash.png')}></Image>
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.BackgroundColor,
    margin: 10,
  }

})
export default Splash
