import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { routes, stations } from './suport/routerData';
import { routeIdList } from './suport/getListRouteId';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';
const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v11';
const MAPBOX_CENTER = [106.0804849, 21.1169071];
const MAPBOX_ZOOM = 10.5;
let unFirst = false;

export default function Map(props) {
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: MAPBOX_STYLE,
      center: MAPBOX_CENTER,
      zoom: MAPBOX_ZOOM,
    });

    //init page load soure & layer (route line) all route
    initLoadLine(map.current);

    //open menu navbar on left
    if (document.getElementById('clickOpenNavWhenInitPage')) document.getElementById('clickOpenNavWhenInitPage').click();

    // Clean up the map instance when the component unmounts
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (props.display === 'DefaultMenu') { //data init and back to data init
      map.current.setCenter(MAPBOX_CENTER);
      map.current.setZoom(MAPBOX_ZOOM);
      if (!props.showMap) map.current.panBy([190, 0]);

      if (unFirst) { //only when back to data init
        setDataSoureAll(map.current);
        //clear all old markers
        clearMarkerByClassName('mapboxgl-marker');
      }
      //load marker start-end bus stop, all bus stop, node marker
      initLoadMarker(map.current);
    } else {
      unFirst = true;
      //clear all old lines
      clearDataSoure(map.current);
      //clear all old markers
      clearMarkerByClassName('mapboxgl-marker');
      if (props.display === 'DetailStation' && (!props.routeId || props.checkRelativeRoutes === 2)) {
        let relativeRoutes = stations.features.find(feature => feature.geometry.coordinates === props.stationId).properties.routes.map(route => ({ name: route.name, color: route.color }));
        //setup new line by relativeRoutes
        setDataSoureByRelativeRoutes(map.current, relativeRoutes);
        //setup new list marker by relativeRoutes
        relativeRoutes.forEach(e => {
          loadMarker(map.current, e.name, props.checkRelativeRoutes, e.color === 'green' ? 1 : e.color === 'red' ? 2 : '');
        });
      } else { //when props.display === 'DetailRoute'
        //setup new line by routeId
        setDataSoureByRouteId(map.current, props.routeId, props.showMap, props.checkGoBack);
        loadMarker(map.current, props.routeId, props.checkRelativeRoutes, props.checkGoBack);
      }
      //event click list bus stop in menu => map
      clickButtonToHere(props.stationId, map.current, 1.2);
    }
  }, [props.showMap, props.display, props.routeId, props.stationId, props.checkRelativeRoutes, props.checkGoBack]);

  return (
    <div ref={mapRef} style={{ width: 'inherit', height: 'inherit' }} />
  );
}

function initLoadLine(map) {
  routeIdList.forEach(e => {
    addSourceLayer(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.return, 'red');
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
        'id': idSoureLayer,
        'type': 'line',
        'source': idSoureLayer,
        'paint': {
          'line-color': color,
          'line-width': 4,
          'line-opacity': color === 'red' ? 0.5 : 1
        },
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
      });
    } catch (error) { }
  });
}

function getGeojson(coordinates) {
  return {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'MultiLineString',
          'coordinates': [coordinates]
        }
      }
    ],
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
      }
    }
  };
}

function setDataSoureAll(map) {
  routeIdList.forEach(e => {
    setDataSoure(map, 'Bus Route ' + e + ' Go', routes.features.find(element => element.geometry.id === e).coordinates.go);
    setDataSoure(map, 'Bus Route ' + e + ' Back', routes.features.find(element => element.geometry.id === e).coordinates.return);
  });
}

function clearDataSoure(map) {
  routeIdList.forEach(e => {
    setDataSoure(map, 'Bus Route ' + e + ' Go', []);
    setDataSoure(map, 'Bus Route ' + e + ' Back', []);
  });
}

function clearMarkerByClassName(className) {
  const elements = document.getElementsByClassName(className); //clear all old markers
  while (elements.length > 0) elements[0].remove();
}

function setDataSoureByRouteId(map, routeId, showMap, checkGoBack) {
  if (checkGoBack === 1) {
    setDataSoure(map, 'Bus Route ' + routeId + ' Go', routes.features.find(element => element.geometry.id === routeId).coordinates.go);
    zoomBounds(map, routes.features.find(element => element.geometry.id === routeId).coordinates.go, showMap);
  } else if (checkGoBack === 2) {
    setDataSoure(map, 'Bus Route ' + routeId + ' Back', routes.features.find(element => element.geometry.id === routeId).coordinates.return);
    zoomBounds(map, routes.features.find(element => element.geometry.id === routeId).coordinates.return, showMap);
  } else if (checkGoBack === 0) {
    setDataSoure(map, 'Bus Route ' + routeId + ' Go', routes.features.find(element => element.geometry.id === routeId).coordinates.go);
    setDataSoure(map, 'Bus Route ' + routeId + ' Back', routes.features.find(element => element.geometry.id === routeId).coordinates.return);
    zoomBounds(map, routes.features.find(element => element.geometry.id === routeId).coordinates.go, showMap);
  };
}

function setDataSoureByRelativeRoutes(map, relativeRoutes) {
  relativeRoutes.forEach(e => {
    if (e.color === 'green') {
      setDataSoure(map, 'Bus Route ' + e.name + ' Go', routes.features.find(element => element.geometry.id === e.name).coordinates.go);
    } else if (e.color === 'red') {
      setDataSoure(map, 'Bus Route ' + e.name + ' Back', routes.features.find(element => element.geometry.id === e.name).coordinates.return);
    } else if (!e.color) {
      setDataSoure(map, 'Bus Route ' + e.name + ' Go', routes.features.find(element => element.geometry.id === e.name).coordinates.go);
      setDataSoure(map, 'Bus Route ' + e.name + ' Back', routes.features.find(element => element.geometry.id === e.name).coordinates.return);
    }
  });
}

function setDataSoure(map, idSoureLayer, coordinates) {
  let geojson = getGeojson(coordinates);
  map.getSource(idSoureLayer).setData(geojson);
}

function zoomBounds(map, coordinates, showMap) {
  // Calculate the bounding box of all the line coordinates
  const bounds = new mapboxgl.LngLatBounds();
  coordinates.forEach(coord => bounds.extend(coord));

  // Set the map's zoom and center to fit the bounding box
  map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: showMap ? 50 : (50 + 380) } // Optional padding
  });
}

function initLoadMarker(map) {
  for (const feature of stations.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    if (feature.geometry.pointId === '0108217') {
      el.className = 'marker-node marker-01-08-217';
    } else if (feature.geometry.pointId === '0127') {
      el.className = 'marker-node marker-01-27';
    } else if (feature.geometry.pointId === '0286212') {
      el.className = 'marker-node marker-02-86-212';
    } else if (feature.geometry.pointId === '0286') {
      el.className = 'marker-node marker-02-86';
    } else if (feature.geometry.pointId === '0886') {
      el.className = 'marker-node marker-08-86';
    } else if (feature.geometry.pointId === '27204') {
      el.className = 'marker-node marker-27-204';
    } else if (feature.geometry.pointId === '6854203') {
      el.className = 'marker-node marker-68-54-203';
    } else if (feature.geometry.pointId === '1054210') {
      el.className = 'marker-node marker-10-54-210';
    } else if (!feature.geometry.pointId) {
      el.className = 'marker-all';
    } else {
      el.className = 'marker-green';
    }
    el.id = feature.geometry.coordinates;

    let routes = feature.properties.routes;
    if (!isNaN(feature.geometry.pointId)) {
      routes = feature.properties.routes.filter(route => route.start);
    } else {
      routes = feature.properties.routes;
    }

    let offset = '';
    if (typeof feature.geometry.pointId !== 'string') offset = 25;

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
        + (typeof feature.geometry.pointId !== 'string' ? '' : renderLink(feature.geometry.coordinates)) +
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

function loadMarker(map, routeId, checkRelativeRoutes, checkGoBack) {
  // add markers to map
  let features = stations.features.filter(feature => typeof feature.geometry.pointId !== 'string').filter(feature => feature.properties.routes.some(route => route.name === routeId));
  if (checkGoBack === 1) features = features.filter(feature => feature.properties.routes.find(route => route.name === routeId).color !== 'red');
  else if (checkGoBack === 2) features = features.filter(feature => feature.properties.routes.find(route => route.name === routeId).color !== 'green');
  for (const feature of features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    if (checkRelativeRoutes === 2) {
      el.className = 'marker-all';
    } else {
      const matchColor = feature.properties.routes.find(route => route.name === routeId).color;
      if (matchColor === 'green') {
        el.className = 'marker-green';
      } else if (matchColor === 'red') {
        el.className = 'marker-red';
      } else {
        el.className = 'marker';
      }
    }
    el.id = feature.geometry.coordinates;

    // make a marker for each feature and add it to the map
    createMarker(map, el, feature, feature.properties.routes, 25);
  };
}

function clickButtonToHere(stationId, map, scale) {
  if (document.getElementById(stationId)) {
    //for all marker have opacity = 0.3
    const elements = document.getElementsByClassName('mapboxgl-marker');
    for (const element of elements) {
      element.style.opacity = '0.3';
    }
    const elementsNode = document.getElementsByClassName('marker-node');
    for (const element of elementsNode) {
      element.style.opacity = '1';
    }
    document.getElementById(stationId).style.backgroundImage = 'url(https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/bus-stop-here.png)';
    document.getElementById(stationId).style.marginTop = '-40px'
    document.getElementById(stationId).style.width = '80px';
    document.getElementById(stationId).style.height = '80px';
    document.getElementById(stationId).style.opacity = '1';
    map.flyTo({
      center: stationId,
      zoom: scale * MAPBOX_ZOOM
    });
  }
}