export default function StationInformation(props) {
  return (
    <>
      <table>
          <tbody>
            <tr>
              <td style={{ width: 100 }}>Số hiệu:</td>
              <td>{props.feature.properties.name}</td>
            </tr>
            <tr>
              <td rowSpan={2} >Điểm đầu:</td>
              <td>(A)</td>
            </tr>
            <tr>
              <td>(B)</td>
            </tr>
            <tr>
              <td>Cự ly: </td>
              <td>5436</td>
            </tr>
          </tbody>
        </table>
    </>
  );
}