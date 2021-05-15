import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";
import polyline from '@mapbox/polyline';
import { STRAVAKEY } from '../services/constants/rest';

MapboxGL.setAccessToken(STRAVAKEY.TOKENMAPMOX);



const DEFAULT_PADDING = {
  top: 40, right: 40, bottom: 40, left: 40
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;


const MapBoxView = (props) => {
  const [polylines, setPolylines] = useState([]);
  const [activeTab, setActiveTab] = useState('NoMAP');

  const LATITUDE = props.start_latlng ? props.start_latlng[0] : 1;
  const LONGITUDE = props.start_latlng ? props.start_latlng[1] : 1;
  const LATITUDE_DELTA = props.end_latlng ? props.end_latlng[0] : 1;
  const LONGITUDE_DELTA = props.end_latlng ? props.end_latlng[1] : 1;

  const SAMPLE_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
  };

  const MAP_CENTER = {
    LOG: (LONGITUDE + LONGITUDE_DELTA) / 2,
    LAT: (LATITUDE + LATITUDE_DELTA) / 2
  }

  useEffect(() => {
    async function checkLoginInit() {
      //      MapboxGL.setTelemetryEnabled(false);
      //console.log('fim1', LONGITUDE_DELTA, LATITUDE_DELTA)
      let route = {
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: []
        },
        properties: {}
      };
      if ((props.summary_polyline !== null) && (props.summary_polyline.length > 0)) {


        polyline.decode(props.summary_polyline).map(function (item, index) {
          MAP_CENTER.LOG = Math.abs(item[1]) > Math.abs(MAP_CENTER.LOG) ? item[1] : MAP_CENTER.LOG
          MAP_CENTER.LAT = Math.abs(item[0]) > Math.abs(MAP_CENTER.LAT) ? item[0] : MAP_CENTER.LAT

          //    console.log('/n', 'coordinates ', [item[1], item[0]])

          route.geometry.coordinates.push([item[1], item[0]])
        });
        setPolylines(route);
        setActiveTab('Mapa')
        //console.log('center', MAP_CENTER)

      }
    }
    checkLoginInit();
  }, []);



  return (
    <>
      {activeTab === 'Mapa' ?
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[MAP_CENTER.longitude, MAP_CENTER.latitude]}
          style={styles.map} >

          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[MAP_CENTER.LOG, MAP_CENTER.LAT]}
            //  fitBounds={MAP_CENTER}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          <MapboxGL.ShapeSource id='line1' shape={polylines}>
            <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>

        : <Text>Atividade manual</Text>}



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

export default MapBoxView;
