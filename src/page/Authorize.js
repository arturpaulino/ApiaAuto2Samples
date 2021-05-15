import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { getOauth } from '../services/token';
import Profile from '../components/Profile'
import { Button } from 'react-native-elements';

function Authorize({ navigation, route }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    const { code } = route.params?.params ?? {};
    async function checkLoginInit() {
      const data = (await getOauth(code))
      setData(data)
    }
    checkLoginInit()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { data !== null ? <Profile props {...data}></Profile> : null}

      <Button title='Inciar trabalhos' onPress={() => navigation.push('Login') } />

    </View>
  )
}

export default Authorize
