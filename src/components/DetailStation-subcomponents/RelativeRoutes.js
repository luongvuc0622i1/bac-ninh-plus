export default function RelativeRoutes(props) {
  const features = props.feature.properties.routes;
  console.log(features);

  const handleClickChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e.target.value);
  }
  
  return (
    <>
      <div className='list-button'>
        {features.map((feature, index) => (
          <div key={index}>
            <button className='button-route-or-station' onClick={handleClickChangeRoute} value={feature.name} >{feature.name}
              {/* <b>{feature.properties.name ? feature.properties.name : feature.properties.address} </b>
              <small style={{ display: feature.properties.description ? '' : 'none' }}>({feature.properties.description})</small><br />
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
              <div style={{ height: '25px' }}></div> */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}