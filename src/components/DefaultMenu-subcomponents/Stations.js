import { useState } from 'react';
import { stations } from '../suport/routerData';

export default function Stations(props) {
  const [textSearch, setTextSearch] = useState('');
  let features = stations.features.filter(feature => typeof feature.geometry.pointId !== 'string');
  features = [
    ...features.filter(feature => feature.geometry.pointId).sort((a, b) => a.geometry.pointId - b.geometry.pointId),
    ...features.filter(feature => !feature.geometry.pointId).sort((a, b) => a.properties.district.localeCompare(b.properties.district))
  ]
    .filter(feature => feature.properties.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));

  const inputText = (e) => {
    setTextSearch(e.target.value);
  }

  const handleStation = (e) => {
    props.parentCallbackChangeStation(e);
  }

  const handleClickChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e.target.value);
  }

  return (
    <>
      <input className='input-text' placeholder='Tìm trạm dừng' onChange={inputText} />
      <div className='list-button'>
        {features.map((feature, index) => (
          <div key={index} style={{ position: 'relative' }} >
            <button className='button-route-or-station' onClick={() => handleStation(feature.geometry.coordinates)} >
              <b>{feature.properties.name ? feature.properties.name : feature.properties.address} </b>
              <small style={{ display: feature.properties.description ? '' : 'none' }}>({feature.properties.description})</small><br />
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
              <div style={{ height: '25px' }}></div>
            </button>
            <div className='list-button-route' >
              {feature.properties.routes.slice(0, 6).map(route => (<button key={JSON.stringify(route)} className='button-stations' onClick={handleClickChangeRoute} value={route.name} >{route.name}</button>))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}