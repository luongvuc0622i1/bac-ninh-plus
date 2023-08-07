import Information from './Information';
import Station from './Station';
import Timeline from './Timeline';

export default function DetailRoute(props) {
  let classButton;

  if (props.widthDimension > 500) {
    classButton = 'button button-3';
  } else {
    classButton = 'button button-4';
  }

  const handleChoose = (e) => {
    props.parentCallbackChangeChoose(e);
  }

  return (
    <>
      <button onClick={props.parentCallbackBack}>Back</button>
      <div>{props.routeId}</div>
      <div className='group'>
        <button className={classButton} style={{ backgroundColor: props.chooseId === 4 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(4)} >Thông tin</button>
        <button className={classButton} style={{ backgroundColor: props.chooseId === 5 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(5)} >Trạm dừng</button>
        <button className={classButton} style={{ backgroundColor: props.chooseId === 6 ? "#4CAF50" : "#3e8e41" }} onClick={() => handleChoose(6)} >Biểu đồ giờ</button>
        <button className={classButton} style={{ backgroundColor: props.chooseId === 3 ? "#4CAF50" : "#3e8e41", display: props.widthDimension > 500 ? 'none' : '' }} onClick={() => handleChoose(3)} >Bản đồ</button>
      </div>
      <div className='group group-detail' style={{ display: props.chooseId === 4 && props.routeId ? "block" : "none" }} >
        <Information routeId={props.routeId} />
      </div>
      <div className='group group-detail' style={{ display: props.chooseId === 5 && props.routeId ? "block" : "none" }} >
        <Station routeId={props.routeId} />
      </div>
      <div className='group group-detail' style={{ display: props.chooseId === 6 && props.routeId ? "block" : "none" }} >
        <Timeline routeId={props.routeId} />
      </div>
    </>
  );
}