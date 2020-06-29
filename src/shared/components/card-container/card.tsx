import classNames from "classnames";
import React from 'react';
import { ProjectType } from '../../../classes/project.class';
import { CategoryInfoType } from "../../../classes/category-info.class";
import TileCard from "../tile-card";

const updateQueryParam = (param: string): void => {
  // update url w/o page reload
  if (!param) return;
  if (window.history && window.history.pushState) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category=' + encodeURI(param);
    window.history.pushState({ path: newurl }, '', newurl);
  } else {
    alert('Please update your browser version');
  }
}

const ProjectCard = ({
  data, setCard, selected, isMobile
}: {
  data: ProjectType | CategoryInfoType, setCard: Function, selected: ProjectType | CategoryInfoType, isMobile: boolean
}) => {
  const { categoryName, imageURL } = data;
  const selectedName = selected && selected.categoryName ? selected.categoryName[0] : '';

  const selectCard = () => {
    updateQueryParam(categoryName);
    setCard({selected: data, visible: true});
  };
  
  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === categoryName
  });

  let sizing;
  if (!!selectedName) {
    sizing = 'p-col-12';
  } else if (isMobile) { // show all, mobile
    sizing = 'p-col-4';
  } else { // show all, not mobile
    sizing = 'p-col-2';
  }
  
  return (
    <div key={categoryName} className={sizing}>
      <TileCard displayName={categoryName} imageURL={imageURL} actions={[{fn: selectCard}]} className={highlight}/>
    </div>
  );
}
export default ProjectCard;