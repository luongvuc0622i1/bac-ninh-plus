import { useState } from 'react';
import { stations } from '../../data/stations';

export default function Infomation(props) {
  const [chooseId, setChooseId] = useState(1);
  const [textSearch, setTextSearch] = useState('');
  let features = [];
  if (chooseId === 1) features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'red').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return -1; else return 0; }).filter(feature => feature.properties.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));
  else features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'blue').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return 0; else return -1; }).filter(feature => feature.properties.name.toLowerCase().includes(textSearch.toLowerCase()) || feature.properties.description.toLowerCase().includes(textSearch.toLowerCase()));

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const handleClickChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e.target.value);
  }

  const handleStation = (e) => {
    // props.function
  }
  
  const inputText = (e) => {
    setTextSearch(e.target.value);
  }

  function displayName(feature) {
    if ((feature === features[0] && chooseId === 1) || (feature === features[features.length - 1] && chooseId === 2)) return (<b>(A) {feature.properties.name} </b>);
    else if ((feature === features[0] && chooseId === 2) || (feature === features[features.length - 1] && chooseId === 1)) return (<b>(B) {feature.properties.name} </b>);
    return (<b>{feature.properties.name} </b>);
  }

  return (
    <>
      <button className='button-go' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "block" : "none" }} onClick={handleChoose} value="1" >Chiều đi</button>
      <button className='button-back' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "block" : "none" }} onClick={handleChoose} value="2" >Chiều về</button>
      <input className='input-text' placeholder='Tìm trạm dừng' onChange={inputText} />
      <div className='list-button-in-detail' style={{ display: props.routeId ? "block" : "none" }} >
        {features.map((feature, index) => (
          <div key={index} style={{ position: 'relative' }} >
            <button className='button-route-or-station' onClick={() => handleStation(feature.properties.routers.filter(route => route.name === props.routeId)[0].id)} >
              {feature.properties.name ? displayName(feature) : (<b>{feature.properties.address} </b>)}
              {feature.properties.description ? (<small>({feature.properties.description})</small>) : ''}<br />
              <small>Đ/c: </small>
              {feature.properties.address ? <small>{feature.properties.address}, </small> : ''}
              {feature.properties.ward ? <small>{feature.properties.ward}, </small> : ''}
              <small>{feature.properties.district}.</small>
              <div style={{ height: '25px' }}></div>
            </button>
            <div className='list-button-route' >
              {feature.properties.routers.slice(0, 6).map(route => (<button key={JSON.stringify(route)} className='button-stations' onClick={handleClickChangeRoute} value={route.name} >{route.name}</button>))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}