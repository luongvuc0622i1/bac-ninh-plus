import { useState } from 'react';
import { routes } from './suport/routerData';
import Information from './DetailRoute-subcomponents/Information';
import Station from './DetailRoute-subcomponents/Station';
import Timeline from './DetailRoute-subcomponents/Timeline';
import Title from './SubComponents/Title';

export default function DetailRoute(props) {
  const [chooseId, setChooseId] = useState(1);
  if (!props.routeId) return;
  const feature = routes.features.find(el => el.geometry.id === props.routeId);

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const handleBack = () => {
    props.parentCallbackBack();
    setChooseId(1);
  }

  return (
    <>
      <Title title={feature.geometry.name} parentCallbackBack={handleBack} />
      <div className='group'>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 1 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='1' >Thông tin</button>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 2 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='2' >Trạm dừng</button>
        <button className='button button-triple' style={{ backgroundColor: chooseId === 3 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='3' >Biểu đồ giờ</button>
      </div>
      <div className='group group-detail' style={{ display: chooseId === 1 ? 'block' : 'none' }} >
        <Information feature={feature} />
      </div>
      <div className='group' style={{ display: chooseId === 2 ? 'block' : 'none' }} >
        <Station routeId={props.routeId} parentCallbackChangeRoute={props.parentCallbackChangeRoute} parentCallbackChangeStation={props.parentCallbackChangeStation} />
      </div>
      <div className='group group-detail' style={{ display: chooseId === 3 ? 'block' : 'none' }} >
        <Timeline feature={feature} />
      </div>
    </>
  );
}