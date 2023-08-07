export default function DetailStation(props) {
  return (
    <>
      <h1>Station Detail Com: {props.stationId}</h1>
      <button onClick={props.parentCallbackBack}>Back</button>
    </>
  );
}