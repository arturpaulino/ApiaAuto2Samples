import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import MapView, { Polyline, ProviderPropType } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import Colors from '../theme/theme'

const DEFAULT_PADDING = {
  top: 40, right: 40, bottom: 40, left: 40
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LiteMapView = (props) => {
  const [polylines, setPolylines] = useState([]);
  const [activeTab, setActiveTab] = useState('NoMAP');

  const LATITUDE = props.start_latlng ? props.start_latlng[0] : 1;
  const LONGITUDE = props.start_latlng ? props.start_latlng[1] : 1;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0411;
  const SPACE = 0.1;

  const MAPA_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const MAP_CENTER = {
    northEast: {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE,
    },
    southWest: {
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };
  //console.log(MAP_CENTER)
  useEffect(() => {
    async function checkLoginInit() {
      //  console.log(SAMPLE_REGION)
      if ((props.summary_polyline !== null) && (props.summary_polyline.length > 0)) {
        const map = polyline.decode(props.summary_polyline).map(function (item, index) {
          return ({ latitude: item[0], longitude: item[1] });
        });
        setPolylines(map);
        setActiveTab('Mapa')
      }
    }
    checkLoginInit();
  }, []);



  return (
    <>
      {activeTab === 'Mapa' ?
        <MapView
          style={styles.map}
          region={MAPA_REGION}
          initialRegion={MAPA_REGION}
          minZoomLevel={15}
          scrollEnabled={false}
          loadingEnabled={true}
          setMapBoundaries={MAP_CENTER}
        >
          <Polyline
            coordinates={polylines}
            strokeColor={Colors.PrimaryColor}
            strokeWidth={2}
          />
        </MapView>
        : null}
    </>
  );
}


const styles = StyleSheet.create({
  map: {
    height: 300,
    width: 400,
    marginVertical: 10,
  },
});

export default LiteMapView;
