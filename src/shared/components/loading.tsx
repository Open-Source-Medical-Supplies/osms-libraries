import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

const style: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Loading = ({loading, children}: {
  loading: boolean;
  children: React.ReactElement;
}): JSX.Element => {
  return loading ? 
    <div style={style}>
      <ProgressSpinner />
    </div> :
    children
}
export default Loading;