export default function DetailRoute(props) {
  return (
    <>
      <h1>{props.routeId}</h1>
      <button onClick={props.parentCallbackBack}>Back</button>
    </>
  );
}