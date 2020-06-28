import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export interface TileCardAction {
  fn: Function;
  label?: string;
  icon?: string;
}
export type TileCardActions = TileCardAction[];

const TileCard = ({
  displayName, imageURL, actions, className = '', buttonIcon = 'eye'
}: {
  displayName: string;
  imageURL: string;
  actions: TileCardActions;
  className?: string;
  buttonIcon?: string;
}) => {
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={displayName} src={imageURL} style={{ height: '150px' }}/>
  )

  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      {actions ? actions.reverse().map((a, i) => {
        const icon = 'pi pi-' + (a.icon || buttonIcon);
        return <Button
          key={displayName + i}
          onClick={() => a.fn()}
          label={a.label || 'View'}
          icon={icon}
          iconPos='right'
          style={{marginRight: i < actions.length ? '0.5rem' : ''}}
          className="p-button-raised p-button-rounded" />
      }) : null}
    </span>
  );

  return (
    <Card header={headerImage} footer={footer} className={className}>
      <h4 className='clamp-1' style={{textAlign: 'center'}}> {displayName} </h4>
    </Card>
  );
}

export default TileCard;