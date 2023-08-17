import './App.css';
import { useWindowDimension } from './components/suport/useWindowDimension';
import { useState } from 'react';
import Map from './components/Map';
import DefaultMenu from './components/DefaultMenu';
import DetailRoute from './components/DetailRoute';

export default function App() {
  const [width, height] = useWindowDimension();
  const [showMap, setShowMap] = useState(true);
  const [routeId, setRouteId] = useState();
  const [stationId, setStationId] = useState();
  let classMenu = 'menu menu-on-computer';
  let classMap = 'map map-on-computer';

  if (showMap) {
    classMenu = 'menu menu-on-phone-when-show-map';
    classMap = 'map map-on-phone-when-show-map';
  }

  const handleShowMap = (e) => {
    setShowMap(e);
  }

  const handleClickChangeRoute = (e) => {
    setRouteId(e);
    setStationId();
  }

  const handleClickChangeStation = (e) => {
    setStationId(e);
  }

  return (
    <div className='container'>
      <div className='header'>
      <img src='https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/logo2.png' alt='logo' className='logo' />
        <h2>Bắc Ninh Plus: {width} x {height}</h2>
      </div>
      {width > 500 ? ( //for website
        <>
          <div className={classMenu} style={{ display: routeId ? 'none' : '' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMenu} style={{ display: routeId ? '' : 'none' }} >
            <DetailRoute routeId={routeId} parentCallbackBack={() => setRouteId()} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMap}>
            <Map routeId={routeId} stationId={stationId} />
            <div className='button-show-menu' style={{ display: showMap ? 'none' : '' }} onClick={() => handleShowMap(true)} >
              <i className='fa fa-chevron-left' />
            </div>
            <div className='button-show-menu' style={{ display: showMap ? '' : 'none', left: showMap ? '' : '380px' }} onClick={() => handleShowMap(false)} >
              <i className='fa fa-chevron-right' id='clickOpenNavWhenInitPage' />
            </div>
          </div>
        </>
      ) : ( //for phone
        <>
          <div className='menu menu-on-phone-when-normal' style={{ display: routeId ? 'none' : '' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className='menu menu-on-phone-when-normal' style={{ display: routeId ? '' : 'none' }} >
            <DetailRoute routeId={routeId} parentCallbackBack={() => setRouteId()} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
            <div className='group' style={{ height: '300px', color: 'black' }}>
              <Map routeId={routeId} stationId={stationId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}