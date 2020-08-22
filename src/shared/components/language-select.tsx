import React, { useRef } from 'react';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import { getLang } from '../utility/language.utility';
import { IETF } from '../constants/ietf.constants';
import { useTypedSelector } from '../../redux/root.reducer';
import { MenuItem } from 'primereact/components/menuitem/MenuItem';
import { empty } from '../utility/general.utility';
import { LanguageBase, DispatchLanguageAction, LANG_ACTIONS } from '../../redux/language.reducer';
import { useDispatch } from 'react-redux';

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