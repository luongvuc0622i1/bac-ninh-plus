import { routes } from '../suport/routerData';

export default function RelativeRoutes(props) {
  let features = [];
  props.feature.properties.routes.forEach(e => {
    features.push(routes.features.find(feature => feature.geometry.id === e.name));
  });

  const handleClickChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e);
  }
  
  return (
    <>
      <div style={{ height: 'calc(100vh - 55px - 148px - 28px)', overflow: 'auto' }}>
        {features.map(feature => (
          <button key={feature.geometry.id} className='button-route-or-station' onClick={() => handleClickChangeRoute(feature.geometry.id)} >
            <i className='fa fa-bus' />
            <div style={{ float: 'right', width: 'calc(100% - 40px)' }}>
              <h3>{feature.geometry.id}</h3>
              <h4>{feature.geometry.name}</h4>
              <div style={{ float: 'left' }}>
                <i className='fa fa-clock-o' />  {feature.properties.timeline[1][0]} - {feature.properties.timeline[feature.properties.timeline.length - 1][0]}
              </div>
              <div style={{ float: 'right' }}>
                {feature.properties.ticket.busTicket[0] ? feature.properties.ticket.busTicket[0].money : ''}  <i className='fa fa-money' />
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}