import { useState } from 'react';
import Routes from './Routes';
import Stations from './Stations';

export default function DefaultMenu(props) {
  const [chooseId, setChooseId] = useState(1);

  const handleChoose = (e) => {
    setChooseId(e);
  }

  const handleShowMap = (e) => {
    props.parentCallbackShowMap();
  }

  return (
    <>
      <div className='group'>
        <button className={props.classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(1)} >Tuyến buýt</button>
        <button className={props.classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(2)} >Trạm dừng</button>
        <button className={props.classButton} style={{ display: props.widthDimension > 500 ? 'none' : '' }} onClick={handleShowMap} >Bản đồ</button>
      </div>
      <div className='group' style={{ display: chooseId === 1 ? '' : 'none' }} >
        <Routes parentCallbackChangeRoute={props.parentCallbackChangeRoute} />
      </div>
      <div className='group' style={{ display: chooseId === 2 ? '' : 'none' }} >
        <Stations parentCallbackChangeStation={props.parentCallbackChangeStation} />
      </div>
    </>
  );
}