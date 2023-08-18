import { useState } from 'react';
import Information from './DetailRoute-subcomponents/Information';
import Station from './DetailRoute-subcomponents/Station';
import Timeline from './DetailRoute-subcomponents/Timeline';

export default function DetailRoute(props) {
  const [chooseId, setChooseId] = useState(1);

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const handleBack = () => {
    props.parentCallbackBack();
    setChooseId(1);
  }

  return (
    <>
      <div className='group' style={{ height: '38px' }}>
        <div style={{ width: 'calc(100% - 43px)', overflow: 'auto hidden', whiteSpace: 'nowrap', float: 'left' }} >
          <b style={{ fontSize: '28px' }}>{props.routeId}</b>
        </div>
        <button className='button-reply' onClick={handleBack}>
          <i className='fa fa-reply' />
        </button>
      </div>
      <div className='group'>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='1' >Thông tin</button>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='2' >Trạm dừng</button>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value='3' >Biểu đồ giờ</button>
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