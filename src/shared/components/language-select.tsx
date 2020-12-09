import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/components/menuitem/MenuItem';
import { SlideMenu } from 'primereact/slidemenu';
import React, { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchLanguageAction, LanguageBase, LANG_ACTIONS } from '../../redux/language.reducer';
import { useTypedSelector } from '../../redux/root.reducer';
import { IETF } from '../constants/ietf.constants';
import { empty } from '../utility/general.utility';
import classNames from "classnames";

const LanguageSelect = ({klass}: {klass?: string}) => {
  const {base, selected} = useTypedSelector(({ lang: { base, selected } }) => ({base, selected}));
  const menuEl = useRef<SlideMenu | null>();
  const dispatch = useDispatch<DispatchLanguageAction>();
	
	const menuItems: MenuItem[] = useMemo(() => {
		if (empty(base)) {
			return [];
		}

		return Object.keys(base as LanguageBase)
			.map((key): MenuItem => ({
				icon: 'flag-icon flag-icon-' + key.slice(3,5).toLowerCase(), // 'en-US' -> 'US'
				label: key,
				command: () => dispatch({
					type: LANG_ACTIONS.SELECT_LANG,
					selected: key as IETF
				})
			}))
			.sort((a,b) => a.label && b.label ? a.label.localeCompare(b.label) : 0);
	}, [base]); // eslint-disable-line react-hooks/exhaustive-deps
	
  if (!selected && empty(base)) {
    return <Button type="button" disabled={true} icon='pi pi-globe' />
  }

	const className = classNames(
		"language-selector-container",
		klass
	);

  return (
    <div className={className}>
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