import { useState } from 'react';
import { stations } from '../suport/routerData';

export default function Infomation(props) {
  let chooseId = props.checkGoBack;
  const [textSearch, setTextSearch] = useState('');
  let features = stations.features.filter(feature => typeof feature.geometry.pointId !== 'string').filter(feature => feature.properties.routes.some(route => route.name === props.routeId)).filter(feature => feature.properties.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));
  if (chooseId === 1) features = features.filter(feature => feature.properties.routes.find(route => route.name === props.routeId).color !== 'red').sort((firstEl, secondEl) => { if (secondEl.properties.routes.find(route => route.name === props.routeId).id > firstEl.properties.routes.find(route => route.name === props.routeId).id) return -1; else return 0; });
  else features = features.filter(feature => feature.properties.routes.find(route => route.name === props.routeId).color !== 'green').sort((firstEl, secondEl) => { if (secondEl.properties.routes.find(route => route.name === props.routeId).id > firstEl.properties.routes.find(route => route.name === props.routeId).id) return 0; else return -1; });

  const handleChoose = (e) => {
    props.parentCallbackCheckGoBack(parseInt(e.target.value));
  }

  const handleClickChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e.target.value);
    props.parentCallbackCheckGoBack(1);
  }

  const handleStation = (e) => {
    props.parentCallbackChangeStation(e);
  }
  
  const inputText = (e) => {
    setTextSearch(e.target.value);
  }

  function displayName(feature) {
    if (((feature === features[0] && chooseId === 1) || (feature === features[features.length - 1] && chooseId === 2)) && !textSearch) return (<b>(A) {feature.properties.name} </b>);
    else if (((feature === features[0] && chooseId === 2) || (feature === features[features.length - 1] && chooseId === 1)) && !textSearch) return (<b>(B) {feature.properties.name} </b>);
    return (<b>{feature.properties.name} </b>);
  }

  return (
    <>
      <button className='button-go' style={{ backgroundColor: chooseId === 1 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='1' >Chiều đi</button>
      <button className='button-back' style={{ backgroundColor: chooseId === 2 ? '#4CAF50' : '#3e8e41' }} onClick={handleChoose} value='2' >Chiều về</button>
      <input className='input-text' placeholder='Tìm trạm dừng' onChange={inputText} />
      <div className='list-button-in-detail'>
        {features.map((feature, index) => (
          <div key={index} style={{ position: 'relative' }} >
            <button className='button-route-or-station' onClick={() => handleStation(feature.geometry.coordinates)} >
              {feature.properties.name ? displayName(feature) : (<b>{feature.properties.address} </b>)}
              {feature.properties.description ? (<small>({feature.properties.description})</small>) : ''}<br />
              <small>Đ/c: </small>
              {feature.properties.address ? <small>{feature.properties.address}, </small> : ''}
              {feature.properties.ward ? <small>{feature.properties.ward}, </small> : ''}
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