// import { useState } from 'react';
import Routes from './Routes';
import Stations from './Stations';

export default function DefaultMenu(props) {

  const handleChoose = (e) => {
    props.parentCallbackChangeChoose(e);
  }

  return (
    <>
      <div className='group'>
        <button className={props.classButton} style={{ backgroundColor: props.chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(1)} >Tuyến buýt</button>
        <button className={props.classButton} style={{ backgroundColor: props.chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(2)} >Trạm dừng</button>
        <button className={props.classButton} style={{ backgroundColor: props.chooseId === 3 ? "#4CAF50" : "#3e8e41", display: props.widthDimension > 500 ? 'none' : '' }} onClick={() => handleChoose(3)} >Bản đồ</button>
      </div>
      <div className='group' style={{ display: props.chooseId === 1 ? '' : 'none' }} >
        <Routes parentCallbackChangeRoute={props.parentCallbackChangeRoute} />
      </div>
      <div className='group' style={{ display: props.chooseId === 2 ? '' : 'none' }} >
        <Stations parentCallbackChangeStation={props.parentCallbackChangeStation} />
      </div>
    </>
  );
}