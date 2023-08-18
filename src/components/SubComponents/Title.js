export default function Title(props) {
  return (
    <div className='group' style={{ height: '38px' }}>
      <div style={{ width: 'calc(100% - 43px)', overflow: 'auto hidden', whiteSpace: 'nowrap', float: 'left' }} >
        <b style={{ fontSize: '28px' }}>{props.title}</b>
      </div>
      <button className='button-reply' onClick={props.parentCallbackBack}>
        <i className='fa fa-reply' />
      </button>
    </div>
  );
}