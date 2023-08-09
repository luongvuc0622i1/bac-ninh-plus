import React from 'react';
import mapboxgl from "mapbox-gl";
import { center } from 'turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import bn01Go from '../data/bus-routes/bn01-go.json';
import bn01Back from '../data/bus-routes/bn01-back.json';
import bn02Go from '../data/bus-routes/bn02-go.json';
import bn02Back from '../data/bus-routes/bn02-back.json';
import bn03Go from '../data/bus-routes/bn03-go.json';
import bn03Back from '../data/bus-routes/bn03-back.json';
import bn08Go from '../data/bus-routes/bn08-go.json';
import bn08Back from '../data/bus-routes/bn08-back.json';
import bn27Go from '../data/bus-routes/bn27-go.json';
import bn27Back from '../data/bus-routes/bn27-back.json';
import bn68Go from '../data/bus-routes/bn68-go.json';
import bn68Back from '../data/bus-routes/bn68-back.json';
import bn86aGo from '../data/bus-routes/bn86a-go.json';
import bn86aBack from '../data/bus-routes/bn86a-back.json';
import bn86bGo from '../data/bus-routes/bn86b-go.json';
import bn86bBack from '../data/bus-routes/bn86b-back.json';
import b10aGo from '../data/bus-routes/10a-go.json';
import b10aBack from '../data/bus-routes/10a-back.json';
import b54Go from '../data/bus-routes/54-go.json';
import b54Back from '../data/bus-routes/54-back.json';
import b204Go from '../data/bus-routes/204-go.json';
import b204Back from '../data/bus-routes/204-back.json';
import b217Go from '../data/bus-routes/217-go.json';
import b217Back from '../data/bus-routes/217-back.json';
import { stations } from '../data/stations';

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
      <div>
        <div ref={el => this.mapContainer = el} className='a1' />
      </div>
    );
  }
}

function initLoadLine(map) {
  addSourceLayer(map, 'Init Route BN01 Back', [bn01Back], 'red');
  addSourceLayer(map, 'Init Route BN01 Go', [bn01Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN02 Back', [bn02Back], 'red');
  addSourceLayer(map, 'Init Route BN02 Go', [bn02Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN03 Back', [bn03Back], 'red');
  addSourceLayer(map, 'Init Route BN03 Go', [bn03Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN08 Back', [bn08Back], 'red');
  addSourceLayer(map, 'Init Route BN08 Go', [bn08Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN27 Back', [bn27Back], 'red');
  addSourceLayer(map, 'Init Route BN27 Go', [bn27Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN68 Back', [bn68Back], 'red');
  addSourceLayer(map, 'Init Route BN68 Go', [bn68Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN86A Back', [bn86aBack], 'red');
  addSourceLayer(map, 'Init Route BN86A Go', [bn86aGo], '#3e8e41');
  addSourceLayer(map, 'Init Route BN86B Back', [bn86bBack], 'red');
  addSourceLayer(map, 'Init Route BN86B Go', [bn86bGo], '#3e8e41');
  addSourceLayer(map, 'Init Route 10A Back', [b10aBack], 'red');
  addSourceLayer(map, 'Init Route 10A Go', [b10aGo], '#3e8e41');
  addSourceLayer(map, 'Init Route 54 Back', [b54Back], 'red');
  addSourceLayer(map, 'Init Route 54 Go', [b54Go], '#3e8e41');
  addSourceLayer(map, 'Init Route 204 Back', [b204Back], 'red');
  addSourceLayer(map, 'Init Route 204 Go', [b204Go], '#3e8e41');
  addSourceLayer(map, 'Init Route 217 Back', [b217Back], 'red');
  addSourceLayer(map, 'Init Route 217 Go', [b217Go], '#3e8e41');
  addSourceLayer(map, 'Bus Route Back', [], 'red');
  addSourceLayer(map, 'Bus Route Go', [], '#3e8e41');
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
  map.removeLayer('Init Route BN01 Go').removeSource('Init Route BN01 Go');
  map.removeLayer('Init Route BN01 Back').removeSource('Init Route BN01 Back');
  map.removeLayer('Init Route BN02 Go').removeSource('Init Route BN02 Go');
  map.removeLayer('Init Route BN02 Back').removeSource('Init Route BN02 Back');
  map.removeLayer('Init Route BN03 Go').removeSource('Init Route BN03 Go');
  map.removeLayer('Init Route BN03 Back').removeSource('Init Route BN03 Back');
  map.removeLayer('Init Route BN08 Go').removeSource('Init Route BN08 Go');
  map.removeLayer('Init Route BN08 Back').removeSource('Init Route BN08 Back');
  map.removeLayer('Init Route BN27 Go').removeSource('Init Route BN27 Go');
  map.removeLayer('Init Route BN27 Back').removeSource('Init Route BN27 Back');
  map.removeLayer('Init Route BN68 Go').removeSource('Init Route BN68 Go');
  map.removeLayer('Init Route BN68 Back').removeSource('Init Route BN68 Back');
  map.removeLayer('Init Route BN86A Go').removeSource('Init Route BN86A Go');
  map.removeLayer('Init Route BN86A Back').removeSource('Init Route BN86A Back');
  map.removeLayer('Init Route BN86B Go').removeSource('Init Route BN86B Go');
  map.removeLayer('Init Route BN86B Back').removeSource('Init Route BN86B Back');
  map.removeLayer('Init Route 10A Go').removeSource('Init Route 10A Go');
  map.removeLayer('Init Route 10A Back').removeSource('Init Route 10A Back');
  map.removeLayer('Init Route 54 Go').removeSource('Init Route 54 Go');
  map.removeLayer('Init Route 54 Back').removeSource('Init Route 54 Back');
  map.removeLayer('Init Route 204 Go').removeSource('Init Route 204 Go');
  map.removeLayer('Init Route 204 Back').removeSource('Init Route 204 Back');
  map.removeLayer('Init Route 217 Go').removeSource('Init Route 217 Go');
  map.removeLayer('Init Route 217 Back').removeSource('Init Route 217 Back');
}

function clearMarkerByClassName(className) {
  const elements = document.getElementsByClassName(className); //clear all old markers
  while (elements.length > 0) elements[0].remove();
}

function setDataSoureById(map, routeId) {
  if (routeId === "BN01") {
    setDataSoure(map, 'Bus Route Go', [bn01Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn01Back], routeId);
  } else if (routeId === "BN02") {
    setDataSoure(map, 'Bus Route Go', [bn02Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn02Back], routeId);
  } else if (routeId === "BN03") {
    setDataSoure(map, 'Bus Route Go', [bn03Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn03Back], routeId);
  } else if (routeId === "BN08") {
    setDataSoure(map, 'Bus Route Go', [bn08Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn08Back], routeId);
  } else if (routeId === "BN27") {
    setDataSoure(map, 'Bus Route Go', [bn27Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn27Back], routeId);
  } else if (routeId === "BN68") {
    setDataSoure(map, 'Bus Route Go', [bn68Go], routeId);
    setDataSoure(map, 'Bus Route Back', [bn68Back], routeId);
  } else if (routeId === "BN86A") {
    setDataSoure(map, 'Bus Route Go', [bn86aGo], routeId);
    setDataSoure(map, 'Bus Route Back', [bn86aBack], routeId);
  } else if (routeId === "BN86B") {
    setDataSoure(map, 'Bus Route Go', [bn86bGo], routeId);
    setDataSoure(map, 'Bus Route Back', [bn86bBack], routeId);
  } else if (routeId === "10A") {
    setDataSoure(map, 'Bus Route Go', [b10aGo], routeId);
    setDataSoure(map, 'Bus Route Back', [b10aBack], routeId);
  } else if (routeId === "54") {
    setDataSoure(map, 'Bus Route Go', [b54Go], routeId);
    setDataSoure(map, 'Bus Route Back', [b54Back], routeId);
  } else if (routeId === "204") {
    setDataSoure(map, 'Bus Route Go', [b204Go], routeId);
    setDataSoure(map, 'Bus Route Back', [b204Back], routeId);
  } else if (routeId === "217") {
    setDataSoure(map, 'Bus Route Go', [b217Go], routeId);
    setDataSoure(map, 'Bus Route Back', [b217Back], routeId);
  };
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
                            routeId === '210' ? 10.2 :
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
    document.getElementById(stationId).style.backgroundImage = "url(../images/bus-stop-here.png)";
    document.getElementById(stationId).style.marginTop = "-40px"
    document.getElementById(stationId).style.width = "80px";
    document.getElementById(stationId).style.height = "80px";
    document.getElementById(stationId).style.opacity = "1";
  }
}