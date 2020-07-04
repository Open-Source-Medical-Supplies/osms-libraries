import classNames from "classnames";
import React from 'react';
import { Project } from '../../../classes/project.class';
import { CategoryInfo } from "../../../classes/category-info.class";
import TileCard from "../tile-card";
import LIB from "../../../types/lib.enum";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/root.reducer";

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
  data: Project | CategoryInfo;
  setCard: Function;
  selected: Project | CategoryInfo;
  isMobile: boolean;
}) => {
  const lib: LIB = useSelector<RootState, LIB>(({lib}) => lib)

  const { displayName, imageURL } = data;
  const selectedName = selected && selected.displayName ? selected.displayName[0] : '';

  const selectCard = () => {
    updateQueryParam(displayName);
    setCard({selected: data, visible: true});
  };
  
  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === displayName
  });

  let sizing = 'p-col-2'; // default: show all, not mobile
  if (!!selectedName) {
    // condense to share w/ fullcard
    sizing = lib === LIB.PROJECTS ? 'p-col-6': 'p-col-12';
  } else if (isMobile) {
    // show all, mobile
    sizing = 'p-col-4';
  }

  return (
  <div key={displayName} className={sizing}>
    <TileCard mainText={displayName} imageURL={imageURL} actions={[{fn: selectCard}]} className={highlight}/>
    </div>
  );
}
export default ProjectCard;