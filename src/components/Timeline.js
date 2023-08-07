import { routes } from "../data/routes";

export default function Timeline(props) {
  if (!props.routeId) return;
  const timeline = routes.features.find(el => el.geometry.id === props.routeId).properties.timeline;

  return (
    <>
      <table style={{ tableLayout: 'fixed', width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ width: '50px', textAlign: 'center' }}>STT</th>
            <th style={{ textAlign: 'center' }}>{timeline[0][0]}</th>
            <th style={{ textAlign: 'center' }}>{timeline[0][1]}</th>
          </tr>
          {timeline.map((item,index) => (
            <tr key={index} style={{ display: index ? '' : 'none'}}>
              <td style={{ textAlign: 'center' }}>{index}</td>
              <td style={{ textAlign: 'right', paddingRight: '57px' }}>{item[0]}</td>
              <td style={{ textAlign: 'right', paddingRight: '57px' }}>{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}