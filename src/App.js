import './App.css';
import { useWindowDimension } from './components/useWindowDimension';
import { useState } from 'react';
import Map from './components/Map';
import DefaultMenu from './components/DefaultMenu';
import DetailRoute from './components/DetailRoute';
import DetailStation from './components/DetailStation';

export default function App() {
  const [width, height] = useWindowDimension();
  const [chooseId, setChooseId] = useState(1);
  const [lastChoose, setLastChoose] = useState(1);
  const [routeId, setRouteId] = useState();
  const [stationId, setStationId] = useState();
  let classMenu;
  let classButton;
  let classMap;

  if (width > 500) {
    classMenu = 'menu menu-on-computer';
    classButton = 'button button-2';
    classMap = 'map map-on-computer';
  } else {
    classMenu = 'menu menu-on-phone-when-normal';
    classButton = 'button button-3';
    classMap = 'map map-on-phone-when-normal';
  }

  if (chooseId === 3) {
    classMenu = 'menu menu-on-phone-when-click';
    classMap = 'map map-on-phone-when-click';
  }

  const handleChoose = (e) => {
    if (e === 3) setLastChoose(chooseId);
    setChooseId(e);
    // setMarkerId("");
  }

  const handleClickChangeChoose = (e) => {
    if (e === 3) setLastChoose(chooseId);
    setChooseId(e);
  }

  const handleClickChangeRoute = (e) => {
    setRouteId(e);
    setChooseId(4);
  }

  const handleClickChangeStation = (e) => {
    setStationId(e);
  }
  
  const handleClickBackFromRoute = (e) => {
    setRouteId();
    setChooseId(1);
  }
  
  const handleClickBackFromStation = (e) => {
    setStationId();
    setChooseId(1);
  }

  return (
    <div className='container' >
      <div className='header' >
        <h2>Bắc Ninh Plus: {width} x {height}</h2>
      </div>
      <div className={classMenu} style={{ display: routeId || stationId ? 'none' : '' }}>
        <DefaultMenu classButton={classButton} widthDimension={width} parentCallbackChangeChoose={handleClickChangeChoose} chooseId={chooseId} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
      </div>
      <div className={classMenu} style={{ display: routeId ? '' : 'none' }} >
        <DetailRoute routeId={routeId} widthDimension={width} parentCallbackBack={handleClickBackFromRoute} chooseId={chooseId} parentCallbackChangeChoose={handleClickChangeChoose} />
      </div>
      <div className={classMenu} style={{ display: stationId ? '' : 'none' }} >
        <DetailStation stationId={stationId} parentCallbackBack={handleClickBackFromStation} />
      </div>
      <div className={classMap}>
        <Map />
        <div className='custom-menu' style={{ display: chooseId === 3 ? '' : 'none' }} onClick={() => handleChoose(lastChoose)} >
          <i className='fa fa-chevron-right' />
        </div>
        <div className='custom-menu' style={{ display: chooseId !== 3 ? '' : 'none' }} onClick={() => handleChoose(3)} >
          <i className='fa fa-chevron-left' />
        </div>
      </div>
    </div>
  );
}