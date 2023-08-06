import '../styles/Stations.css';
import { stations } from '../data/stations'
import { useState } from 'react';

export default function Stations() {
  const [textSearch, setTextSearch] = useState('');
  const features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));

  const inputText = (e) => {
    setTextSearch(e.target.value);
  }

  return (
    <div className='sub-container'>
      <input className='input-text' placeholder='Tìm trạm dừng' onChange={inputText} />
      <div className='list-button'>
        {features.map((feature, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <button className='button-route-or-station' >
              <b>{feature.properties.name} </b><small>({feature.properties.description})</small><br />
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
              <div style={{ height: '25px' }}></div>
            </button>
            <div className='list-button-route' >
              {/* {feature.properties.routers.filter(route => route.start).map(route => (<button key={route.name} className='button' onClick={sendDataChangeRoute} value={route.name} >{route.name}</button>))} */}
              {feature.properties.routers.slice(0,6).map(route => (<button key={JSON.stringify(route)} className='button-stations'>{route.name}</button>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}