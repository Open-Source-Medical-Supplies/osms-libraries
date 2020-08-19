import React from 'react';
import { useTypedSelector } from '../../redux/root.reducer';
import FormatHostingURL from '../../services/url-format.service';
import newSvgUrl from '../assets/new-outline.svg';
import updatedSvgUrl from '../assets/updated-outline.svg';
import { Selected } from '../types/selected.type';

const NewUpdatedBanner = ({data}: {data: Selected}) => {
  const isProd = useTypedSelector(({env}) => env.isProd);
  
  if (!data) return null;
  
  const { isNew, isUpdated } = data;
  const isNewBool = isNew === '1';

  if (isNewBool || isUpdated === '1') {
    const srcURL = FormatHostingURL(isNewBool ? newSvgUrl : updatedSvgUrl, isProd);
    return <img
      className='new-updated-banner'
      src={srcURL}
      alt={isNewBool ? 'This is a new item' : 'This item has been updated'}/>
  }
  return <div /> 
}
export default NewUpdatedBanner;