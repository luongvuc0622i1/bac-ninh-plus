import { useState } from 'react';
import Information from './Information';
import Station from './Station';
import Timeline from './Timeline';

export default function DetailRoute(props) {
  const [chooseId, setChooseId] = useState(1);
  let classButton;

  if (props.widthDimension > 500) {
    classButton = 'button button-3';
  } else {
    classButton = 'button button-4';
  }

  const handleChoose = (e) => {
    setChooseId(e);
  }

  const handleShowMap = () => {
    props.parentCallbackShowMap();
  }

  return (
    <>
      <div className='group' style={{ height: '38px' }}>
        <b style={{ fontSize: '28px' }}>{props.routeId}</b>
        <button className='button button-back' onClick={props.parentCallbackBack}>
          <i className='fa fa-reply' />
        </button>
      </div>
      <div className='group'>
        <button className={classButton} style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(1)} >Thông tin</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(2)} >Trạm dừng</button>
        <button className={classButton} style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(3)} >Biểu đồ giờ</button>
        <button className={classButton} style={{ display: props.widthDimension > 500 ? 'none' : '' }} onClick={handleShowMap} >Bản đồ</button>
      </div>
      <div className='group group-detail' style={{ display: chooseId === 1 && props.routeId ? "block" : "none" }} >
        <Information routeId={props.routeId} />
      </div>
      <div className='group group-detail' style={{ display: chooseId === 2 && props.routeId ? "block" : "none" }} >
        <Station routeId={props.routeId} />
      </div>
      <div className='group group-detail' style={{ display: chooseId === 3 && props.routeId ? "block" : "none" }} >
        <Timeline routeId={props.routeId} />
      </div>
    </>
  );
}