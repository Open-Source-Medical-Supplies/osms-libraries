import React from 'react';
import { Project } from "../../classes/project.class";
import { CategoryInfo } from "../../classes/category-info.class";
import NewSvg from '../assets/new-outline.svg';
import UpdatedSvg from '../assets/updated-outline.svg';

const NewUpdatedBanner = ({data}: {data: Project | CategoryInfo}) => {
  const { isNew, isUpdated } = data;
  const isNewBool = isNew === '1';

  if (isNewBool || isUpdated === '1') {
    return <img
      className='new-updated-banner'
      src={isNewBool ? NewSvg : UpdatedSvg}
      alt={isNewBool ? 'This is a new item' : 'This item has been updated'}/>
  }
  return <div /> 
}
export default NewUpdatedBanner;