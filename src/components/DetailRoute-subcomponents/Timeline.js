export default function Timeline(props) {
  const timeline = props.feature.properties.timeline;
  const pointA = props.feature.geometry.name.split(' - ')[0];
  const pointB = props.feature.geometry.name.split(' - ')[1];

  return (
    <>
      <table style={{ tableLayout: 'fixed', width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ width: '10px', textAlign: 'center' }}></th>
            <th style={{ textAlign: 'center' }}>{pointA}</th>
            <th style={{ textAlign: 'center' }}>{pointB}</th>
          </tr>
          {timeline.map((item,index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center', paddingRight: parseInt(item[0].slice(0, 2)) > 9 ? '0.55em' : '' }} >{item[0]}</td>
              <td style={{ textAlign: 'center', paddingRight: parseInt(item[1].slice(0, 2)) > 9 ? '0.55em' : '' }} >{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}