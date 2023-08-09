import { useState } from 'react';
import Information from './DetailRoute-subcomponents/Information';
import Station from './DetailRoute-subcomponents/Station';
import Timeline from './DetailRoute-subcomponents/Timeline';

export default function DetailRoute(props) {
  const [chooseId, setChooseId] = useState(1);
  let classButton;

  if (props.widthDimension > 500) {
    classButton = 'button button-triple';
  } else {
    classButton = 'button button-quadruple';
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const handleShowMap = () => {
    props.parentCallbackShowMap();
  }

  return (
    <>
      <div className='group' style={{ height: '38px' }}>
        <b style={{ fontSize: '28px' }}>{props.routeId}</b>
        <button className='button-reply' onClick={props.parentCallbackBack}>
          <i className='fa fa-reply' />
        </button>
      </div>
      <div className='group'>
        <button className={classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='1' >Thông tin</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='2' >Trạm dừng</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='3' >Biểu đồ giờ</button>
        <button className={classButton} style={{ display: props.widthDimension > 500 ? 'none' : '' }} onClick={handleShowMap} >Bản đồ</button>
      </div>
      <div className='group group-detail' style={{ display: chooseId === 1 ? "block" : "none" }} >
        <Information routeId={props.routeId} />
      </div>
      <div className='group' style={{ display: chooseId === 2 ? "block" : "none" }} >
        <Station routeId={props.routeId} parentCallbackChangeRoute={props.parentCallbackChangeRoute} parentCallbackChangeStation={props.parentCallbackChangeStation} />
      </div>
      <div className='group group-detail' style={{ display: chooseId === 3 ? "block" : "none" }} >
        <Timeline routeId={props.routeId} />
      </div>
    </>
  );
}