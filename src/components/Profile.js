import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { timestampToDate } from '../services/helpers/tools';
import { Avatar } from 'react-native-elements';

const Profile = (props) => {
  const dateTk = timestampToDate(props.auth.expires_at).toString();
  console.log(props.athlete)
  return (
    <View style={styles.container} >

      <View style={styles.headers} >
        <View style={styles.avatar} >
          <Avatar
            title={props.athlete.firstname}
            size="large"
            rounded
            source={{
              uri: props.athlete.profile,
            }}
          />
        </View>
        <View style={styles.dados} >
          <Text>{props.athlete.firstname} {props.athlete.lastname}</Text>
          <Text>{props.athlete.city}, {props.athlete.state} </Text>
        </View>
      </View >

      <View style={styles.token} >
        <Text>Token valido ate: {dateTk}</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    width: '100%',
  },
  headers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 0,
    width: '100%',
  },
  avatar: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 5,
    alignItems: 'center',

  },
  dados: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  token: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },


})


export default Profile;
