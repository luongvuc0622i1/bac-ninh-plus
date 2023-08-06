import './App.css';
import { useWindowDimension } from './components/useWindowDimension';
import { useState } from 'react';
import Routes from './components/Routes';
import Stations from './components/Stations';
import Map from './components/Map';

export default function App() {
  const [width, height] = useWindowDimension();
  const [chooseId, setChooseId] = useState(1);
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
    setChooseId(e);
    // setMarkerId("");
  }

  return (
    <div className='container' >
      <div className='header' >
        <h2>Bắc Ninh Plus: {width} x {height}</h2>
      </div>
      <div className={classMenu}>
        <div className='group'>
          <button className={classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(1)} >Tuyến buýt</button>
          <button className={classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(2)} >Trạm dừng</button>
          <button className={classButton} style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41", display: width > 500 ? 'none' : '' }} onClick={() => handleChoose(3)} >Bản đồ</button>
        </div>
        <div className='group' style={{ display: chooseId === 1 ? '' : 'none' }} >
          <Routes />
        </div>
        <div className='group' style={{ display: chooseId === 2 ? '' : 'none' }} >
          <Stations />
        </div>
      </div>
      <div className={classMap} >
        <Map />
        <div className='custom-menu' style={{ display: chooseId === 3 ? '' : 'none' }} onClick={() => handleChoose(1)} >
          <i className='fa fa-chevron-right'/>
        </div>
        <div className='custom-menu' style={{ display: chooseId !== 3 ? '' : 'none' }} onClick={() => handleChoose(3)} >
          <i className='fa fa-chevron-left'/>
        </div>
      </div>
    </div>
  );
}