import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/components/menuitem/MenuItem';
import { SlideMenu } from 'primereact/slidemenu';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchLanguageAction, LanguageBase, LANG_ACTIONS } from '../../redux/language.reducer';
import { useTypedSelector } from '../../redux/root.reducer';
import { IETF } from '../constants/ietf.constants';
import { empty } from '../utility/general.utility';

const LanguageSelect = () => {
  const {base, selected} = useTypedSelector(({ lang: { base, selected } }) => ({base, selected}));
  const menuEl = useRef<SlideMenu | null>();
  const dispatch = useDispatch<DispatchLanguageAction>();

  if (!selected && empty(base)) {
    return <Button type="button" disabled={true} icon='pi pi-globe' />
  }

  let menuItems: MenuItem[] = Object.keys(base as LanguageBase).map((key): MenuItem => {
    return {
      icon: 'flag-icon flag-icon-' + key.slice(3,5).toLowerCase(), // 'en-US' -> 'US'
      command: () => dispatch({
        type: LANG_ACTIONS.SELECT_LANG,
        selected: key as IETF
      })
    }
  })

  return (
    <div className='language-selector-container'>
      <Button
        className='mobile-button__square'
        type="button"
        icon='pi pi-globe'
        onClick={(event) => menuEl.current?.toggle(event)}
      ></Button>
      <SlideMenu ref={(el) => menuEl.current = el} model={menuItems} popup />
    </div>
  )
}
export default LanguageSelect;