import './App.css';
import { useWindowDimension } from './components/suport/useWindowDimension';
import React, { useEffect, useState } from 'react';
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
    classMenu = 'menu menu-on-computer-when-show-map';
    classMap = 'map map-on-computer-when-show-map';
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

  useEffect(() => {
    if (localStorage.getItem('routes') === null || localStorage.getItem('routes') === null) {
      const url = 'https://script.google.com/macros/s/AKfycbx_t8rwPiQJUI_n9DyFvUVIlvKuAm2_2S_ztKOV1OBU9X8n9hhhmCAyCMUqIa420_7D/exec';
      // Sử dụng Promise.all để gọi cả hai API
      Promise.all([
        fetch(url + '?action=getRoutes').then((response) => response.json()),
        fetch(url + '?action=getStations').then((response) => response.json()),
      ]).then(([result1, result2]) => {
        localStorage.setItem('routes', JSON.stringify(result1));
        localStorage.setItem('stations', JSON.stringify(result2));
      }).catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      });
    }
  }, []);

  const handleReload = () => {
    // Thực hiện hành động load lại trang
    window.location.reload();
  };

  // Kiểm tra liệu đã có dữ liệu từ cả hai API hay chưa
  if (localStorage.getItem('routes') === null || localStorage.getItem('routes') === null) {
    return (
      <div>
        <button onClick={handleReload}>Refresh Trang</button>
      </div>
    );
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
            <Map height={height} showMap={showMap} display={display} routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} checkGoBack={checkGoBack} />
            <div className='button-show-menu' style={{ display: showMap ? 'none' : '' }} onClick={() => handleShowMap(true)} >
              <i className='fa fa-chevron-left' />
            </div>
            <div className='button-show-menu' style={{ display: showMap ? '' : 'none' }} onClick={() => handleShowMap(false)} >
              <i className='fa fa-chevron-right' id='clickOpenNavWhenInitPage' />
            </div>
          </div>
        </>
      ) : ( //for phone
        <div className='menu menu-on-phone'>
          <div style={{ display: display === 'DefaultMenu' ? '' : 'none' }}>
            <DefaultMenu parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div style={{ display: display === 'DetailRoute' ? '' : 'none' }} >
            <DetailRoute routeId={routeId} checkGoBack={checkGoBack} parentCallbackCheckGoBack={e => setCheckGoBack(e)} parentCallbackBack={handleBackFromRoute} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackChangeStation={handleClickChangeStation} />
          </div>
          <div style={{ display: display === 'DetailStation' ? '' : 'none' }} >
            <DetailStation routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} parentCallbackBack={handleBackFromStation} parentCallbackChangeRoute={handleClickChangeRoute} parentCallbackCheckRelativeRoutes={handleCheckRelativeRoutes} />
          </div>
          <div className='group' style={display === 'DetailRoute' || display === 'DetailStation' ? { height: '300px', color: 'black' } : { height: '0px', color: 'black', padding : '0px', marginBottom : '0px' }} >  
            <Map showMap={showMap} display={display} routeId={routeId} stationId={stationId} checkRelativeRoutes={checkRelativeRoutes} checkGoBack={checkGoBack} />
          </div>
        </div>
      )}
    </div>
  );
}