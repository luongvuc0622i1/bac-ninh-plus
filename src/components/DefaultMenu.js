import { useState } from 'react';
import Routes from './DefaultMenu-subcomponents/Routes';
import Stations from './DefaultMenu-subcomponents/Stations';

export default function DefaultMenu(props) {
  const [chooseId, setChooseId] = useState(1);
  let classButton;

  if (props.widthDimension > 500) {
    classButton = 'button button-double';
  } else {
    classButton = 'button button-triple';
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const handleShowMap = () => {
    props.parentCallbackShowMap();
  }

  return (
    <>
      <div className='group'>
        <button className={classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='1' >Tuyến buýt</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='2' >Trạm dừng</button>
        <button className={classButton} style={{ display: props.widthDimension > 500 ? 'none' : '' }} onClick={handleShowMap} >Bản đồ</button>
      </div>
      <div className='group' style={{ display: chooseId === 1 ? '' : 'none' }} >
        <Routes parentCallbackChangeRoute={props.parentCallbackChangeRoute} />
      </div>
      <div className='group' style={{ display: chooseId === 2 ? '' : 'none' }} >
        <Stations parentCallbackChangeStation={props.parentCallbackChangeStation} parentCallbackChangeRoute={props.parentCallbackChangeRoute} />
      </div>
    </>
  );
}