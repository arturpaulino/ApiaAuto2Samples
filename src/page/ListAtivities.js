/* eslint-disable no-undef */
/* eslint-disable no-alert */
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button, View, Text, StyleSheet, FlatList } from 'react-native'
import Colors from '../theme/theme.js'
import { isLogged } from '../services/token';
import { getListAtivities } from '../services/Ativitie';
import Loading from '../components/Loading'

import Ativitie from '../components/Activitie';

const ListAtivities = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('List');
  const [data, setData] = useState([]);
  const [activeMap, setActiveMap] = useState('MapBox');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLoginInit() {
      console.log(' mapa enviado ', route.params.mapa)
      setActiveMap(route.params.mapa)
      // setActiveMap('MapBox')
      if ((await isLogged()) === false) {
        setDatautoriz([]);
        setActiveTab('List');
      } else {
        setData(await getListAtivities());
        setActiveTab('List');
      }
      setIsLoading(false)
    }
    checkLoginInit();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    )
  }


  const List = () => {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({ item }) =>
            <Ativitie key={item.id} {...item} mapa={activeMap} athlete={route.params.athlete} />} />
      </View>

    )
  }

  return (
    <View style={styles.container} >
      {activeTab === 'List' ? <List /> : null}
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PaperColor,
    width: '100%',
    marginTop: 0,
  }
})
export default ListAtivities
