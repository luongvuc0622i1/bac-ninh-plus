import { useState } from 'react';
import Routes from './Routes';
import Stations from './Stations';

export default function DefaultMenu(props) {
  const [chooseId, setChooseId] = useState(1);
  let classButton;

  if (props.widthDimension > 500) {
    classButton = 'button button-2';
  } else {
    classButton = 'button button-3';
  }

  const handleChoose = (e) => {
    setChooseId(e);
  }

  const handleShowMap = () => {
    props.parentCallbackShowMap();
  }

  return (
    <>
      <div className='group'>
        <button className={classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(1)} >Tuyến buýt</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(2)} >Trạm dừng</button>
        <button className={classButton} style={{ display: props.widthDimension > 500 ? 'none' : '' }} onClick={handleShowMap} >Bản đồ</button>
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