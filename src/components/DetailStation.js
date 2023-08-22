import { stations } from './suport/routerData';
import RelativeRoutes from './DetailStation-subcomponents/RelativeRoutes';
import StationInformation from './DetailStation-subcomponents/StationInformation';
import Title from './SubComponents/Title';

export default function DetailStation(props) {
  if (!props.stationId) return;
  const feature = stations.features.find(feature => feature.geometry.coordinates === props.stationId);

  const handleChoose = (e) => {
    props.parentCallbackCheckRelativeRoutes(parseInt(e.target.value));
  }

  const handleBack = () => {
    props.parentCallbackBack();
  }

  return (
    <>
      <Title title={feature.properties.name ? feature.properties.name : feature.properties.address} parentCallbackBack={handleBack} />
      <div className='group'>
        <button className='button button-double' style={{ backgroundColor: props.checkRelativeRoutes === 1 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='1' >Thông tin</button>
        <button className='button button-double' style={{ backgroundColor: props.checkRelativeRoutes === 2 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='2' >Các tuyến</button>
      </div>
      <div className='group group-detail' style={{ display: props.checkRelativeRoutes === 1 ? 'block' : 'none' }} >
        <StationInformation feature={feature} />
      </div>
      <div className='group' style={{ display: props.checkRelativeRoutes === 2 ? 'block' : 'none' }} >
        <RelativeRoutes feature={feature} parentCallbackChangeRoute={props.parentCallbackChangeRoute} />
      </div>
    </>
  );
}