import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import { getLang } from '../utility/language.utility';

export interface TileCardAction {
  fn: Function;
  label?: string | null;
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
  const Lang = getLang();
  className = 'grayscale ' + className; 

  const headerImage = (
    typeof imageURL === 'string' ?
      <img className={'card-header__image centered-image'} alt={mainText} src={imageURL}/> :
      <div className={'card-header__no-image center-flex'}>No image available</div>
  );

  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      {actions && !actionOnCard ? actions.reverse().map((a, i) => {
        const icon = 'pi pi-' + (a.icon || buttonIcon);
        if (a.label !== null) {
          return <Button
            key={mainText + i}
            onClick={() => a.fn()}
            label={a.label || Lang.get('view')}
            icon={icon}
            iconPos='right'
            style={{marginRight: i < actions.length ? '0.5rem' : ''}}
            className="p-button-raised p-button-rounded" />
        } else {
          return <Button
            type='button'
            key={mainText + i}
            onClick={() => a.fn()}
            icon={icon}
            style={{marginRight: i < actions.length ? '0.5rem' : ''}}
            className='p-button-raised p-button-rounded' />
        }
      }) : null}
    </span>
  );

  const BaseCard = (
    <Card header={headerImage} footer={footer} className={className}>
      { children || <h4 className='clamp-2' style={{textAlign: 'center'}}> {mainText} </h4> }
    </Card>
  );

  const ActionCard = (
    <button
      className={className + ' tile-card button-no-style'}
      onClick={(e) => (actions as TileCardActions)[0].fn(e)}>
      <Card header={headerImage}>
        <div className='tile-card__header clamp-2'> {mainText} </div>
        { subText ? <div className='tile-card__sub-header clamp-1'> {subText} </div> : null }
      </Card>
    </button>
  );

  return actionOnCard && actions && actions.length ? ActionCard : BaseCard;
}

export default TileCard;