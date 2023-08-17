import React from 'react';
import mapboxgl from 'mapbox-gl';
import { center } from 'turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import { routes, stations, bn01Go, bn01Back, bn02Go, bn02Back, bn03Go, bn03Back, bn08Go, bn08Back, 
         bn27Go, bn27Back, bn68Go, bn68Back, bn86aGo, bn86aBack, bn86bGo, bn86bBack, b10aGo, b10aBack, b54Go, b54Back, 
         b203Go, b203Back, b204Go, b204Back, b210Go, b210Back, b212Go, b212Back, b217Go, b217Back } from './suport/api';
import { routeIdList } from './suport/getListRouteId';

// import { routes } from '../data/routes';
// import { stations } from '../data/stations';
// import { bn01Go } from '../data/bus-routes/bn01Go';
// import { bn01Back } from '../data/bus-routes/bn01Back';
// import { bn02Go } from '../data/bus-routes/bn02Go';
// import { bn02Back } from '../data/bus-routes/bn02Back';
// import { bn03Go } from '../data/bus-routes/bn03Go';
// import { bn03Back } from '../data/bus-routes/bn03Back';
// import { bn08Go } from '../data/bus-routes/bn08Go';
// import { bn08Back } from '../data/bus-routes/bn08Back';
// import { bn27Go } from '../data/bus-routes/bn27Go';
// import { bn27Back } from '../data/bus-routes/bn27Back';
// import { bn68Go } from '../data/bus-routes/bn68Go';
// import { bn68Back } from '../data/bus-routes/bn68Back';
// import { bn86aGo } from '../data/bus-routes/bn86aGo';
// import { bn86aBack } from '../data/bus-routes/bn86aBack';
// import { bn86bGo } from '../data/bus-routes/bn86bGo';
// import { bn86bBack } from '../data/bus-routes/bn86bBack';
// import { b10aGo } from '../data/bus-routes/b10aGo';
// import { b10aBack } from '../data/bus-routes/b10aBack';
// import { b54Go } from '../data/bus-routes/b54Go';
// import { b54Back } from '../data/bus-routes/b54Back';
// import { b203Go} from '../data/bus-routes/b203Go';
// import { b203Back } from '../data/bus-routes/b203Back';
// import { b204Go } from '../data/bus-routes/b204Go';
// import { b204Back } from '../data/bus-routes/b204Back';
// import { b210Go } from '../data/bus-routes/b210Go';
// import { b210Back } from '../data/bus-routes/b210Back';
// import { b212Go } from '../data/bus-routes/b212Go';
// import { b212Back } from '../data/bus-routes/b212Back';
// import { b217Go } from '../data/bus-routes/b217Go';
// import { b217Back } from '../data/bus-routes/b217Back';

const dynamicValues = {
  "[bn01Go]": [bn01Go],
  "[bn01Back]": [bn01Back],
  "[bn02Go]": [bn02Go],
  "[bn02Back]": [bn02Back],
  "[bn03Go]": [bn03Go],
  "[bn03Back]": [bn03Back],
  "[bn08Go]": [bn08Go],
  "[bn08Back]": [bn08Back],
  "[bn27Go]": [bn27Go],
  "[bn27Back]": [bn27Back],
  "[bn68Go]": [bn68Go],
  "[bn68Back]": [bn68Back],
  "[bn86aGo]": [bn86aGo],
  "[bn86aBack]": [bn86aBack],
  "[bn86bGo]": [bn86bGo],
  "[bn86bBack]": [bn86bBack],
  "[b10aGo]": [b10aGo],
  "[b10aBack]": [b10aBack],
  "[b54Go]": [b54Go],
  "[b54Back]": [b54Back],
  "[b203Go]": [b203Go],
  "[b203Back]": [b203Back],
  "[b204Go]": [b204Go],
  "[b204Back]": [b204Back],
  "[b210Go]": [b210Go],
  "[b210Back]": [b210Back],
  "[b212Go]": [b212Go],
  "[b212Back]": [b212Back],
  "[b217Go]": [b217Go],
  "[b217Back]": [b217Back]
};

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

export default class Map extends React.Component {
  first = true;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.0804849, 21.1169071],
      zoom: 10.5
    });
    //init page load soure & layer (route line) all route
    initLoadLine(this.map);
    //init page load marker start-end bus stop, all bus stop, node marker
    initLoadMarker(this.map);
    //open menu navbar on left
    if (document.getElementById('clickOpenNavWhenInitPage')) document.getElementById('clickOpenNavWhenInitPage').click();
  };

  componentDidUpdate() {
    if (this.props.routeId) {
      //first change routeId => clear all init route
      if (this.first) {
        clearInitLoadLine(this.map);
        this.first = false;
      }
      //clear all old markers
      clearMarkerByClassName('mapboxgl-marker');
      //setup new line by route
      setDataSoureById(this.map, this.props.routeId);
      //setup new list marker by route
      loadMarker(this.map, this.props.routeId);
    } else {
      //must load again funtion initLoadMarker because the last funtion in componentDidMount() not run in componentDidUpdate()
      clearMarkerByClassName('mapboxgl-marker');
      initLoadMarker(this.map);
    }
    //event click list bus stop in menu => map
    clickButtonToHere(this.props.stationId);
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} style={{ width: 'inherit', height: 'inherit' }} />
    );
  }
}

function initLoadLine(map) {
  addSourceLayer(map, 'Bus Route Back', [], 'red');
  addSourceLayer(map, 'Bus Route Go', [], '#3e8e41');
  routeIdList.forEach(e => {
    addSourceLayer(map, 'Init Route ' + e + ' Back', dynamicValues[routes.features.find(element => element.geometry.id === e).coordinates.back], 'red');
    addSourceLayer(map, 'Init Route ' + e + ' Go', dynamicValues[routes.features.find(element => element.geometry.id === e).coordinates.go], '#3e8e41');
  });
}

function addSourceLayer(map, idSoureLayer, coordinates, color) {
  map.on('load', () => { //Get initial geojson data from Calgary Open Data
    let geojson = getGeojson(coordinates);
    try {
      map.addSource(idSoureLayer, {
        type: 'geojson',
        data: geojson
      });
      map.addLayer({
        "id": idSoureLayer,
        "type": "line",
        "source": idSoureLayer,
        "paint": {
          "line-color": color,
          "line-width": 4,
          "line-opacity": color === 'red' ? 0.5 : 1
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
      });
    } catch (error) { }
  });
}

function getGeojson(coordinates) {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "MultiLineString",
          "coordinates": coordinates
        }
      }
    ],
    "crs": {
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    }
  };
}

function initLoadMarker(map) {
  for (const feature of stations.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    if (feature.geometry.lineId === '0108217') {
      el.className = 'marker-node marker-01-08-217';
    } else if (feature.geometry.lineId === '0127') {
      el.className = 'marker-node marker-01-27';
    } else if (feature.geometry.lineId === '0286212') {
      el.className = 'marker-node marker-02-86-212';
    } else if (feature.geometry.lineId === '0286') {
      el.className = 'marker-node marker-02-86';
    } else if (feature.geometry.lineId === '0886') {
      el.className = 'marker-node marker-08-86';
    } else if (feature.geometry.lineId === '27204') {
      el.className = 'marker-node marker-27-204';
    } else if (feature.geometry.lineId === '6854203') {
      el.className = 'marker-node marker-68-54-203';
    } else if (feature.geometry.lineId === '1054210') {
      el.className = 'marker-node marker-10-54-210';
    } else if (feature.geometry.type === 'Point') {
      el.className = 'marker-all';
    } else {
      el.className = 'marker-green';
      el.id = feature.geometry.pointId;
    }

    let routes = feature.properties.routers;
    if (feature.geometry.type === 'Point In Province' || feature.geometry.type === 'Point Out Province') {
      routes = feature.properties.routers.filter(route => route.start);
    } else {
      routes = feature.properties.routers;
    }

    let offset = '';
    if (feature.geometry.type !== 'Point') offset = 25;

    // make a marker for each feature and add it to the map
    createMarker(map, el, feature, routes, offset);
  }
}

function createMarker(map, el, feature, routes, offset) {
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(
    new mapboxgl.Popup({ offset: offset }) // add popups
      .setHTML(
        '<div>'
        + (feature.properties.name ? ('<b>' + feature.properties.name + '</b>') : ('<b>' + feature.properties.address + '</b>'))
        + (feature.properties.district ? '' : ('<br/>'))
        + (feature.properties.description ? (' <small>(' + feature.properties.description + ')</small>') : '')
        + '<br/>'
        + (feature.properties.address ? ('<small>Đ/c: ' + feature.properties.address + ', </small>') : '')
        + (feature.properties.ward ? ('<small>' + feature.properties.ward + ', </small>') : '')
        + (feature.properties.district ? ('<small>' + feature.properties.district + '.</small><br/>') : '')
        + renderRouteList(routes) + '<br/>'
        + (feature.geometry.type === 'Line' ? '' : renderLink(feature.geometry.coordinates)) +
        '</div>'
      )
  ).addTo(map);
}

function renderRouteList(routes) {
  const routeNameList = [];
  for (let i = 0; i < routes.length; i++) {
    if (i % 4 === 0 && i !== 0) routeNameList.push('<br/>');
    routeNameList.push('<button class="button-route-map"> ' + routes[i].name + '</button>');
  }
  return routeNameList.join('');
}

function renderLink(coordinates) {
  let longitude = change(coordinates[0]) + 'E';
  let latitude = change(coordinates[1]) + 'N';
  let url = 'https://www.google.com/maps/place/' + latitude + '+' + longitude;
  return ('<a href="' + url + '" target="_blank" >Chỉ đường với Google Map</a>');
}

function change(number) {
  let hours = number - (number % 1);
  let minutes = (number % 1) * 60 - ((number % 1) * 60 % 1);
  let seconds = ((number % 1) * 60 % 1) * 60;
  return hours + "°" + minutes + "'" + seconds + "''";
}

function clearInitLoadLine(map) {
  routeIdList.forEach(e => {
    if (map.getSource('Init Route ' + e + ' Go'))
      map.removeLayer('Init Route ' + e + ' Go').removeSource('Init Route ' + e + ' Go');
    if (map.getSource('Init Route ' + e + ' Back'))
      map.removeLayer('Init Route ' + e + ' Back').removeSource('Init Route ' + e + ' Back');
  });
}

function clearMarkerByClassName(className) {
  const elements = document.getElementsByClassName(className); //clear all old markers
  while (elements.length > 0) elements[0].remove();
}

function setDataSoureById(map, routeId) {
  routeIdList.forEach(e => {
    if (routeId === e) {
      setDataSoure(map, 'Bus Route Go', dynamicValues[routes.features.find(element => element.geometry.id === e).coordinates.go], routeId);
      setDataSoure(map, 'Bus Route Back', dynamicValues[routes.features.find(element => element.geometry.id === e).coordinates.back], routeId);
    }
  });
}

function setDataSoure(map, idSoureLayer, coordinates, routeId) {
  let geojson = getGeojson(coordinates);
  map.getSource(idSoureLayer).setData(geojson);
  fly(map, geojson, routeId);
}

function fly(map, geojson, routeId) {
  let turf_center = center(geojson); //find center of bus route using Turf
  let center_coord = turf_center.geometry.coordinates;
  map.flyTo({
    center: center_coord,
    zoom: routeId === 'BN01' ? 11 :
      routeId === 'BN02' ? 11.5 :
        routeId === 'BN03' ? 12.1 :
          routeId === 'BN08' ? 11.2 :
            routeId === 'BN27' ? 11.3 :
              routeId === 'BN68' ? 11.5 :
                routeId === 'BN86A' ? 10.8 :
                  routeId === 'BN86B' ? 11.5 :
                    routeId === '10A' ? 12 :
                      routeId === '54' ? 11.2 :
                        routeId === '203' ? 10.2 :
                          routeId === '204' ? 11.4 :
                            routeId === '210' ? 10.8 :
                              routeId === '212' ? 10.8 : 10.4
  });
}

function loadMarker(map, routeId) {
  // add markers to map
  const features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === routeId));
  for (const feature of features) {
    const matchId = feature.properties.routers.filter(route => route.name === routeId)[0].id;
    const matchColor = feature.properties.routers.filter(route => route.name === routeId)[0].color;
    // create a HTML element for each feature
    const el = document.createElement('div');
    if (matchColor === 'green') {
      el.className = 'marker-green';
      el.id = matchId;
    } else if (matchColor === 'red') {
      el.className = 'marker-red';
      el.id = matchId;
    } else {
      el.className = 'marker';
      el.id = matchId;
    }

    // make a marker for each feature and add it to the map
    createMarker(map, el, feature, feature.properties.routers, 25);
  };
}

function clickButtonToHere(stationId) {
  if (document.getElementById(stationId)) {
    //for all marker have opacity = 0.3
    const elements = document.getElementsByClassName('mapboxgl-marker');
    for (const element of elements) {
      element.style.opacity = "0.3";
    }
    const elementsNode = document.getElementsByClassName('marker-node');
    for (const element of elementsNode) {
      element.style.opacity = "1";
    }
    document.getElementById(stationId).style.backgroundImage = "url(https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/bus-stop-here.png)";
    document.getElementById(stationId).style.marginTop = "-40px"
    document.getElementById(stationId).style.width = "80px";
    document.getElementById(stationId).style.height = "80px";
    document.getElementById(stationId).style.opacity = "1";
  }
}