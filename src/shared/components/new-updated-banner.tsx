import React from 'react';
import { CategoryInfo } from "../../classes/category-info.class";
import { Project } from "../../classes/project.class";
import FormatHostingURL from '../../services/url-format.service';
import newSvgUrl from '../assets/new-outline.svg';
import updatedSvgUrl from '../assets/updated-outline.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root.reducer';

const NewUpdatedBanner = ({data}: {data: Project | CategoryInfo}) => {
  const { isNew, isUpdated } = data;
  const isNewBool = isNew === '1';
  const isProd = useSelector<RootState, boolean>(({env}) => env.isProd);

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