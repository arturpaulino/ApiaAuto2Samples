import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import ListAtividades from './page/ListAtivities'
import Login from './page/Login';
import Authorize from './page/Authorize';
import Splash from './page/Splash';



const MainApp = createStackNavigator();

function MyStack() {
  return (
    <MainApp.Navigator initialRouteName="Splash" >

      <MainApp.Screen name="Splash" component={Splash} options={{ title: 'Authorize' }} />

      <MainApp.Screen name="Login" component={Login} options={{ title: 'Login' }} />

      <MainApp.Screen name="Authorize" component={Authorize} options={{ title: 'Authorize' }} />


      <MainApp.Screen name="Atividades" component={ListAtividades} options={{
        title: 'Atividades'
      }} />

    </MainApp.Navigator >
  )
}

export default () => {
  console.log('default');
  return (
    <NavigationContainer
      linking={
        {
          prefixes: ['https://apiautoart.page.link'],
          config: {
            Authorize: 'authorize',
          },
        }
      } >
      <MyStack />
    </ NavigationContainer >
  )

}
