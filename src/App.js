import './App.css';
import { useWindowDimension } from './components/suport/useWindowDimension';
import { useState } from 'react';
import Map from './components/Map';
import DefaultMenu from './components/DefaultMenu';
import DetailRoute from './components/DetailRoute';
import DetailStation from './components/DetailStation';

export default function App() {
  const [width, height] = useWindowDimension();
  const [display, setDisplay] = useState('DefaultMenu');
  const [showMap, setShowMap] = useState(true);
  const [routeId, setRouteId] = useState();
  const [stationId, setStationId] = useState();
  const [checkRelativeRoutes, setCheckRelativeRoutes] = useState(1);
  const [checkGoBack, setCheckGoBack] = useState(0);

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
    setDisplay('DetailRoute');
    setCheckRelativeRoutes(1);
  }

  const handleClickChangeStation = (e) => {
    setStationId(e);
    setDisplay('DetailStation');
    setCheckRelativeRoutes(1);
  }

  const handleCheckRelativeRoutes = (e) => {
    setCheckRelativeRoutes(e);
  }

  const handleBackFromRoute = () => {
    setRouteId();
    if (stationId) setDisplay('DetailStation');
    else setDisplay('DefaultMenu');
    setCheckGoBack(0);
  }

  const handleBackFromStation = () => {
    setStationId();
    if (routeId) setDisplay('DetailRoute');
    else setDisplay('DefaultMenu');
    setCheckRelativeRoutes(1);
  }

  return (
    <div className='container'>
      <div className='header'>
        <img src='https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/logo2.png' alt='logo' className='logo' />
        <h1 className='title'>Bắc Ninh Bus</h1>
      </div>
      {width > 500 ? ( //for website
        <>
          <div className={classMenu} style={{ display: display === 'DefaultMenu' ? '' : 'none' }} >
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMenu} style={{ display: display === 'DetailRoute' ? '' : 'none' }} >
            <DetailRoute routeId={routeId} checkGoBack={checkGoBack} parentCallbackCheckGoBack={e => setCheckGoBack(e)} parentCallbackBack={handleBackFromRoute} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMenu} style={{ display: display === 'DetailStation' ? '' : 'none' }} >
            <DetailStation routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} parentCallbackBack={handleBackFromStation} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackCheckRelativeRoutes={handleCheckRelativeRoutes} />
          </div>
          <div className={classMap}>
            <Map scale={height / height} showMap={showMap} display={display} routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} checkGoBack={checkGoBack} />
            <div className='button-show-menu' style={{ display: showMap ? 'none' : '' }} onClick={() => handleShowMap(true)} >
              <i className='fa fa-chevron-left' />
            </div>
            <div className='button-show-menu' style={{ display: showMap ? '' : 'none' }} onClick={() => handleShowMap(false)} >
              <i className='fa fa-chevron-right' id='clickOpenNavWhenInitPage' />
            </div>
          </div>
        </>
      ) : ( //for phone
        <div className='menu menu-on-phone-when-normal'>
          <div style={{ display: display === 'DefaultMenu' ? '' : 'none' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div style={{ display: display === 'DetailRoute' ? '' : 'none' }} >
            <DetailRoute routeId={routeId} checkGoBack={checkGoBack} parentCallbackCheckGoBack={e => setCheckGoBack(e)} parentCallbackBack={handleBackFromRoute} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div style={{ display: display === 'DetailStation' ? '' : 'none' }} >
            <DetailStation routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} parentCallbackBack={handleBackFromStation} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackCheckRelativeRoutes={handleCheckRelativeRoutes} />
          </div>
          <div className='group' style={{ display: display === 'DetailRoute' || display === 'DetailStation' ? '' : 'none', height: '300px', color: 'black' }} >
            <Map scale={0.85} showMap={showMap} display={display} routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} checkGoBack={checkGoBack} />
          </div>
        </div>
      )}
    </div>
  );
}