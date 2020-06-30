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
  displayName,
  imageURL,
  actions = undefined,
  className = '',
  buttonIcon = 'eye',
  children = undefined
}: {
  displayName: string;
  imageURL: string;
  actions?: TileCardActions;
  className?: string;
  buttonIcon?: string;
  children?: React.ReactNode;
}) => {
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex card-header__no-image'>No image available</div> :
      <img className='centered-image card-header__image' alt={displayName} src={imageURL}/>
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
      { children || <h4 className='clamp-1' style={{textAlign: 'center'}}> {displayName} </h4> }
    </Card>
  );
}

export default TileCard;