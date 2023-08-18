import React from 'react';
import mapboxgl from 'mapbox-gl';
import { center } from 'turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import { routes, stations } from './suport/routerData';
import { routeIdList } from './suport/getListRouteId';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';
const mapInitCenter = [106.0804849, 21.1169071];
const mapInitZoom = 10.5;

export default class Map extends React.Component {
  first = true;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: mapInitCenter,
      zoom: mapInitZoom
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
      //clear all old markers
      clearMarkerByClassName('mapboxgl-marker');
      //setup new line by route
      setDataSoureById(this.map, this.props.routeId);
      //setup new list marker by route
      loadMarker(this.map, this.props.routeId);
    } else {
      //must load again funtion initLoadMarker because the last funtion in componentDidMount() not run in componentDidUpdate()
      clearMarkerByClassName('mapboxgl-marker');
      //first time setDataSource in componentDidMount() so not run
      if (!this.first) {
        setDataSoureById(this.map, 'All');
      }
      this.first = false;
      initLoadMarker(this.map);
    }
    if (this.props.relativeRoute) {
      setDataSoureById(this.map, this.props.relativeRoute);
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
  routeIdList.forEach(e => {
    addSourceLayer(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.back, 'red');
    addSourceLayer(map, 'Bus Route ' + e + ' Go', routes.features.find(element => element.geometry.id === e).coordinates.go, '#3e8e41');
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
    }
    el.id = feature.geometry.coordinates;

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
    routeNameList.push('<button class="button-stations"> ' + routes[i].name + '</button>');
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

function clearMarkerByClassName(className) {
  const elements = document.getElementsByClassName(className); //clear all old markers
  while (elements.length > 0) elements[0].remove();
}

function setDataSoureById(map, routeId) {
  routeIdList.forEach(e => {
    if (routeId === 'All') {
      setDataSoure(map, 'Bus Route ' + e + ' Go', routes.features.find(element => element.geometry.id === e).coordinates.go, 'All');
      setDataSoure(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.back, 'All');
    } else {
      setDataSoure(map, 'Bus Route ' + e + ' Go', []);
      setDataSoure(map, 'Bus Route ' + e + ' Back', []);
      if (Array.isArray(routeId)) {
        routeId.forEach(e => {
          setDataSoure(map, 'Bus Route ' + e + ' Go', routes.features.find(element => element.geometry.id === e).coordinates.go, routeId);
          setDataSoure(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.back, routeId);
        });
      } else if (routeId === e) {
        setDataSoure(map, 'Bus Route ' + e + ' Go', routes.features.find(element => element.geometry.id === e).coordinates.go, routeId);
        setDataSoure(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.back, routeId);
      }
    }
  });
}

function setDataSoure(map, idSoureLayer, coordinates, routeId) {
  let geojson = getGeojson(coordinates);
  map.getSource(idSoureLayer).setData(geojson);
  if (routeId === 'All') fly(map, null, routeId);
  else if (routeId) fly(map, geojson, routeId);
}

function fly(map, geojson, routeId) {
  let center_coord = [];
  if (geojson) {
    let turf_center = center(geojson); //find center of bus route using Turf
    center_coord = turf_center.geometry.coordinates;
  } else center_coord = mapInitCenter;
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
                              routeId === '212' ? 10.8 :
                                routeId === '217' ? 10.4 : mapInitZoom
  });
}

function loadMarker(map, routeId) {
  // add markers to map
  const features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === routeId));
  for (const feature of features) {
    const matchColor = feature.properties.routers.filter(route => route.name === routeId)[0].color;
    // create a HTML element for each feature
    const el = document.createElement('div');
    if (matchColor === 'green') {
      el.className = 'marker-green';
    } else if (matchColor === 'red') {
      el.className = 'marker-red';
    } else {
      el.className = 'marker';
    }
    el.id = feature.geometry.coordinates;

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