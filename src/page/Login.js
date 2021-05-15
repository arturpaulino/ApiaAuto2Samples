import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Pressable, Button } from 'react-native'
import Colors from '../theme/theme.js'
import { makeAuthorize, isLogged, getAuthorize, refressAuthorize, cleatAuthorize, setDeauthorization } from '../services/token';

import { Linking } from 'react-native';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('Login');
  const [datautoriz, setDatautoriz] = useState([]);
  useEffect(() => {
    async function checkLoginInit() {
      if ((await isLogged()) === false) {
        setDatautoriz([]);
        setActiveTab('Login');
      } else {
        setDatautoriz(await getAuthorize());
        setActiveTab('Profile');
      }
    }
    checkLoginInit();
  }, []);



  const OpenURLButton = ({ children }) => {
    return <Button title={children} onPress={makeAuthorize} />;
  };

  const OpenURLGithub = async () => {
    const url = "https://github.com/arturpaulino/ApiAuto2Exemplos"
    const okresult = await Linking.canOpenURL(url);
    console.log('okresult', okresult)
    if (okresult) {
      await Linking.openURL(url);
    };
  };

  const nagDetalhes = (provedor) => {
    console.log('provedor', provedor)
    navigation.navigate('Atividades', {
      'mapa': provedor,
      'athlete': datautoriz.athlete
    })
  };

  const Profile = () => {
    return (
      <View style={styles.container} >


        <Pressable style={styles.containerbt} onPress={
          () => nagDetalhes('MapBox')} >
          <Text style={styles.text}>API Strava + MapBox - Atividades Aleta'</Text>
        </Pressable>

        <Pressable style={styles.containerbt} onPress={
          () => nagDetalhes('Google')} >
          <Text style={styles.text}>API Strava + GoogleMaps - Atividades Aleta </Text>
        </Pressable>

        <Pressable style={styles.containerbt} onPress={() => {
          OpenURLGithub();

        }} >
          <Text style={styles.text}>Fontes do repositorios </Text>
        </Pressable>

        <Pressable style={styles.containerbt} onPress={() => {
          setDeauthorization();

        }} >
          <Text style={styles.text}>Sair do aplicativo </Text>
        </Pressable>

      </View >
    )
  }


  const LoginAuto = () => {
    return (
      <View style={styles.container} >
        <OpenURLButton >Fazer autenticação no strava</OpenURLButton>
      </View>
    )
  }

  function switchTab() {
    if (activeTab === 'Login') {
      setActiveTab('Register');
    } else {
      setActiveTab('Login');
    }
  }
  return (
    <View style={styles.container} >
      {activeTab === 'Login' ? <LoginAuto /> : <Profile />}
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.BackgroundColor,
    margin: 10,
  },
  text: {
    color: Colors.PaperColor,

  },
  containerbt: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '90%',
    backgroundColor: Colors.PrimaryColor,
    margin: 10,
    fontSize: 11,

  }
})
export default Login
