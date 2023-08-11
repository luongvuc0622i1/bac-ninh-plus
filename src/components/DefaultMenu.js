import { useState } from 'react';
import Routes from './DefaultMenu-subcomponents/Routes';
import Stations from './DefaultMenu-subcomponents/Stations';

export default function DefaultMenu(props) {
  const [chooseId, setChooseId] = useState(1);

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  return (
    <>
      <div className='group'>
        <button className='button button-double' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='1' >Tuyến buýt</button>
        <button className='button button-double' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='2' >Trạm dừng</button>
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