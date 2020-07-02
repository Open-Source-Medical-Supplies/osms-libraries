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
  mainText,
  subText,
  imageURL,
  actions,
  className = '',
  buttonIcon = 'eye',
  children,
  actionOnCard = false
}: {
  mainText: string;
  subText?: string;
  imageURL: string;
  actions?: TileCardActions;
  className?: string;
  buttonIcon?: string;
  children?: React.ReactNode;
  actionOnCard?: boolean;
}) => {
  if (actionOnCard && actions && actions.length > 1) {
    console.warn('Only the first action can be used!');
  }

  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex card-header__no-image'>No image available</div> :
      <img className='centered-image card-header__image' alt={mainText} src={imageURL}/>
  );

  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      {actions && !actionOnCard ? actions.reverse().map((a, i) => {
        const icon = 'pi pi-' + (a.icon || buttonIcon);
        return <Button
          key={mainText + i}
          onClick={() => a.fn()}
          label={a.label || 'View'}
          icon={icon}
          iconPos='right'
          style={{marginRight: i < actions.length ? '0.5rem' : ''}}
          className="p-button-raised p-button-rounded" />
      }) : null}
    </span>
  );

  const BaseCard = (
    <Card header={headerImage} footer={footer} className={className}>
      { children || <h4 className='clamp-1' style={{textAlign: 'center'}}> {mainText} </h4> }
    </Card>
  );

  const ActionCard = (
    <button
      className={className + ' tile-card button-no-style'}
      onClick={(e) => (actions as TileCardActions)[0].fn(e)}>
      <Card header={headerImage}>
        <div className='tile-card__header clamp-1'> {mainText} </div>
        { subText ? <div className='tile-card__sub-header clamp-1'> {subText} </div> : null }
      </Card>
    </button>
  );

  return actionOnCard && actions && actions.length ? ActionCard : BaseCard;
}

export default TileCard;