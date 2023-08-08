import '../../styles/Routes.css';
import { useState } from 'react';
import { routes } from '../../data/routes';

export default function Routes(props) {
  const [textSearch, setTextSearch] = useState('');
  const features = routes.features.filter(feature => feature.geometry.status).filter(feature => feature.geometry.id.toLowerCase().includes(textSearch.toLowerCase()) || feature.geometry.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));

  const inputText = (e) => {
    setTextSearch(e.target.value);
  }

  const handleChoose = (e) => {
    props.parentCallbackChangeRoute(e);
  }

  return (
    <>
      <input className='input-text' placeholder='Tìm tuyến xe' onChange={inputText} />
      <div className='list-button'>
        {features.map(feature => (
          <button key={feature.geometry.id} className='button-route-or-station' onClick={() => handleChoose(feature.geometry.id)} >
            <i className="fa fa-bus"/>
            <div style={{ float: 'right', width: 'calc(100% - 40px)' }}>
              <h3>{feature.geometry.id}</h3>
              <h4>{feature.geometry.name}</h4>
              <div style={{ float: 'left' }}>
                <i className="fa fa-clock-o"/>  {feature.properties.timeline[1][0]} - {feature.properties.timeline[feature.properties.timeline.length - 1][0]}
              </div>
              <div style={{ float: 'right' }}>
                {feature.properties.ticket[0].grades[0].money}  <i className="fa fa-money"/>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}