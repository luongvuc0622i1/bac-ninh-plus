import './App.css';
import { useWindowDimension } from './components/useWindowDimension';
import { useState } from 'react';
import Map from './components/Map';
import DefaultMenu from './components/DefaultMenu';
import DetailRoute from './components/DetailRoute';
// import DetailStation from './components/DetailStation';

export default function App() {
  const [width, height] = useWindowDimension();
  const [showMap, setShowMap] = useState(true);
  const [routeId, setRouteId] = useState();
  const [stationId, setStationId] = useState();
  let classMenu = 'menu menu-on-computer';
  let classMap = 'map map-on-computer';

  // if (width > 500) {
  //   classMenu = 'menu menu-on-computer';
  //   classMap = 'map map-on-computer';
  // } else {
  //   classMenu = 'menu menu-on-phone-when-normal';
  //   classMap = 'map map-on-phone-when-normal';
  // }

  if (showMap) {
    classMenu = 'menu menu-on-phone-when-show-map';
    classMap = 'map map-on-phone-when-show-map';
  }

  const handleShowMap = (e) => {
    setShowMap(e);
  }

  const handleClickChangeRoute = (e) => {
    setRouteId(e);
  }

  const handleClickChangeStation = (e) => {
    setStationId(e);
  }

  return (
    <div className='container' >
      <div className='header' >
        <h2>Bắc Ninh Plus: {width} x {height}</h2>
      </div>
      {/* <div className={classMenu} style={{ display: stationId ? '' : 'none' }} >
        <DetailStation stationId={stationId} widthDimension={width} parentCallbackBack={() => setStationId()} parentCallbackShowMap={() => handleShowMap(true)} />
      </div> */}
      {width > 500 ? ( //for website
        <>
          <div className={classMenu} style={{ display: routeId ? 'none' : '' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMenu} style={{ display: routeId ? '' : 'none' }} >
            <DetailRoute setup={false} routeId={routeId} parentCallbackBack={() => setRouteId()} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className={classMap}>
            <Map routeId={routeId} stationId={stationId} />
            <div className='button-show-menu' style={{ display: showMap ? 'none' : '' }} onClick={() => handleShowMap(true)} >
              <i className='fa fa-chevron-left' />
            </div>
            <div className='button-show-menu' style={{ display: showMap ? '' : 'none', left: showMap ? '' : '380px' }} onClick={() => handleShowMap(false)} >
              <i className='fa fa-chevron-right' />
            </div>
          </div>
        </>
      ) : ( //for phone
        <>
          <div className='menu menu-on-phone-when-normal' style={{ display: routeId ? 'none' : '' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div className='menu menu-on-phone-when-normal' style={{ display: routeId ? '' : 'none' }} >
            <DetailRoute setup={true} routeId={routeId} stationId={stationId} parentCallbackBack={() => setRouteId()} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
        </>
      )}
    </div>
  );
}