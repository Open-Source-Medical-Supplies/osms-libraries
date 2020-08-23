import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

const style: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  position: 'fixed',
  top: 'calc(calc(100% - 100px) / 2 )'
}

const Loading = ({
  loading,
  children,
  className
}: {
  loading: boolean;
  children: React.ReactElement;
  className?: string;
}): JSX.Element => {
  return loading ? 
    <div style={style} className={className}>
      <ProgressSpinner />
    </div> :
    children
}
export default Loading;