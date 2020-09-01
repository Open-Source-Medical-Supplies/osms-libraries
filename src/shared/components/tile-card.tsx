import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import { getLang } from '../utility/language.utility';
import classNames from "classnames";

export interface TileCardAction {
  fn: Function;
  label?: string | null;
  icon?: string;
  main?: boolean; // use with multiple functions
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
  showButtons = true
}: {
  mainText: string;
  subText?: string;
  imageURL: string;
  actions?: TileCardActions;
  className?: string;
  buttonIcon?: string;
  children?: React.ReactNode;
  showButtons?: boolean;
}) => {
  let mainAction: TileCardAction | undefined = undefined;
  if (actions && actions.length) {
    mainAction = actions.find(a => a.main) || actions[0];
  }
  const Lang = getLang();
  className = 'grayscale ' + className; 
  const headerButtonClasses = classNames('button-no-style w-100', {
    pointer: !!mainAction
  });
  const headerImage = (
    typeof imageURL === 'string' ?
      <button className={headerButtonClasses} onClick={(e) => mainAction && mainAction?.fn(e)}>
        <img className={'card-header__image centered-image'} alt={mainText} src={imageURL}/>
      </button>:
      <div className={'card-header__no-image center-flex'}>No image available</div>
  );

  const footer = !(showButtons && actions && actions.length) ? null :
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      { actions.reverse().map((a, i) => {
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
      }) }
    </span>;

  return (
    <Card header={headerImage} footer={footer} className={className}>
      { children || <h4 className='clamp-2' style={{textAlign: 'center'}}> {mainText} </h4> }
    </Card>
  );
}

export default TileCard;