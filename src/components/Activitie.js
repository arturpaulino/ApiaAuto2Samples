import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';

import LiteMapBox from './MapViewBox';
import LiteMapGoogle from './MapViewGoogle';
import { secondsToMinute, distanceToKm, distanceToKmToRitimo, dateToDate } from '../services/helpers/tools';
import Colors from '../theme/theme.js'

const Activitie = (props) => {
  console.log('Activitie Atividade verdadeiro', props.mapa, props.mapa.trim() === "Mapbox".trim())
  const tempo = secondsToMinute(props.moving_time);
  const tempoLegeda = tempo.minutos + 'min  ' + (tempo.segundos > 0 ? tempo.segundos + 's' : '')
  const km = distanceToKm(props.distance) + ' km';
  const pace = distanceToKmToRitimo(props.moving_time, props.distance)
  const dateRun = dateToDate(props.start_date)
  const mapa = props.mapa.trim().toUpperCase()




  return (
    <View style={styles.container} >

      <View style={styles.headers} >
        <View style={styles.avatar} >
          <Avatar
            title={props.athlete.firstname}
            size="medium"
            rounded
            source={{
              uri: props.athlete.profile,
            }}
          />
        </View>
        <View style={styles.data} >
          <Text>{props.athlete.firstname} {props.athlete.lastname}</Text>
          <Text>{dateRun} {props.athlete.city}, {props.athlete.state} </Text>
        </View>
      </View>

      <View style={styles.name} >
        <Text>{props.name}</Text>
      </View>

      <View style={styles.headers} >

        <View style={styles.distance} >
          <Text>Distancia</Text>
          <Text>{km}</Text>
        </View>

        <View style={styles.rhythm} >
          <Text>Pace</Text>
          <Text>{pace}</Text>
        </View>

        <View style={styles.achievements} >
          <Text>Tempo</Text>
          <Text>{tempoLegeda}</Text>
        </View>

      </View>

      <View style={styles.map} >

        {(mapa == 'MAPBOX') ?
          (
            <LiteMapBox
              start_latlng={props.start_latlng}
              end_latlng={props.end_latlng}
              summary_polyline={props.map.summary_polyline} ></LiteMapBox>
          )
          :
          (
            <LiteMapGoogle
              start_latlng={props.start_latlng}
              end_latlng={props.end_latlng}
              summary_polyline={props.map.summary_polyline} ></LiteMapGoogle>
          )
        }
      </View>

    </View >
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    marginLeft: 5,
    marginRight: 5,
    width: '100%',
    backgroundColor: Colors.PaperColor,
  },
  linha: {
    flex: 1,
    backgroundColor: '#808080',
    width: '100%',
  },

  map: {
    height: 300,
    width: '100%',
    margin: 5,
  },
  headers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    //backgroundColor: '#808080'
  },
  name: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    fontWeight: 'bold',

  },

  avatar: {
    alignItems: 'flex-start',
    margin: 5,
  },
  data: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  distance: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  rhythm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  achievements: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },


})


export default Activitie;
