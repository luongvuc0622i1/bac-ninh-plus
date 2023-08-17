import { routes } from '../suport/api';
// import { routes } from "../../data/routes";

export default function Infomation(props) {
  if (!props.routeId) return;
  const feature = routes.features.find(el => el.geometry.id === props.routeId);

  return (
    <>
      <img src={'https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/'+feature.properties.image} alt={props.routeId} className="image" ></img>
      <hr />
      <table>
        <tbody>
          <tr>
            <td style={{ width: 100 }}>Số hiệu:</td>
            <td>{feature.geometry.id}</td>
          </tr>
          <tr>
            <td rowSpan={2} >Điểm đầu:</td>
            <td>(A) {feature.geometry.name.split(' - ')[0]}</td>
          </tr>
          <tr>
            <td>(B) {feature.geometry.name.split(' - ')[1]}</td>
          </tr>
          <tr>
            <td>Cự ly: </td>
            <td>{feature.properties.distance}</td>
          </tr>
        </tbody>
      </table>
      <hr style={{ display: feature.properties.establish || feature.properties.operatedBy || feature.properties.decision ? '' : 'none' }} />
      <table>
        <tbody>
          <tr style={{ display: feature.properties.establish ? '' : 'none' }}>
            <td style={{ width: 100 }}>Hoạt động:</td>
            <td>{feature.properties.establish}</td>
          </tr>
          {feature.properties.decision.map(el => (
            <tr key={el.name} style={{ display: feature.properties.decision[0].name ? '' : 'none' }} >
              <td rowSpan={feature.properties.decision.length} style={{ width: 100, display: el === feature.properties.decision[0] ? '' : 'none' }} >Văn bản:</td>
              <td><a href={el.link} target="_blank" rel="noopener noreferrer">{el.name}</a></td>
            </tr>
          ))}
          <tr style={{ display: feature.properties.operatedBy ? '' : 'none' }}>
            <td style={{ width: 100 }}>Đơn vị vận hành:</td>
            <td>{feature.properties.operatedBy}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>Thời gian hoạt động:</td>
            <td style={{ width: 80, textAlign: 'center' }}>Xuất bến</td>
            <td style={{ width: 80, textAlign: 'center' }}>Đóng bến</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}>{feature.properties.timeline[0][0]}</td>
            <td style={{ textAlign: 'center' }}>{feature.properties.timeline[1][0]}</td>
            <td style={{ textAlign: 'center' }}>{feature.properties.timeline[feature.properties.timeline.length - 1][0]}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}>{feature.properties.timeline[0][1]}</td>
            <td style={{ textAlign: 'center' }}>{feature.properties.timeline[1][1]}</td>
            <td style={{ textAlign: 'center' }}>{feature.properties.timeline[feature.properties.timeline.length - 1][1]}</td>
          </tr>
        </tbody>
      </table>
      <hr style={{ display: feature.properties.description ? '' : 'none' }} />
      <table>
        <tbody>
          <tr style={{ display: feature.properties.description ? '' : 'none' }}>
            <td style={{ width: 75 }}>Lộ trình:</td>
            <td>{feature.properties.description}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table>
        <tbody>
          <tr>
            <td style={{ width: 75 }}></td>
            <td style={{ width: 199, textAlign: 'center' }}>Chặng</td>
            <td style={{ width: 55, textAlign: 'center' }}>Giá vé</td>
          </tr>
          {feature.properties.ticket[0].grades.map(el => (
            <tr key={el.name} >
              <td rowSpan={feature.properties.ticket[0].grades.length} style={{ display: el === feature.properties.ticket[0].grades[0] ? '' : 'none' }} >Vé lượt:</td>
              <td>{el.name}</td>
              <td style={{ textAlign: 'right' }}>{el.money}</td>
            </tr>
          ))}
          <tr style={{ height: '20px' }} />
          {feature.properties.ticket[1].grades.map(el => (
            <tr key={el.name} >
              <td rowSpan={feature.properties.ticket[1].grades.length} style={{ display: el === feature.properties.ticket[1].grades[0] ? '' : 'none' }} >Vé tháng:</td>
              <td>{el.name}</td>
              <td style={{ textAlign: 'right' }}>{el.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}