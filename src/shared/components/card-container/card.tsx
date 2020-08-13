import classNames from "classnames";
import React, { Dispatch, useRef } from 'react';
import { useDispatch } from "react-redux";
import { CategoryInfo } from "../../classes/category-info.class";
import { Project } from '../../classes/project.class';
import { useTypedSelector } from "../../../redux/root.reducer";
import { SelectAction, SELECTED_ACTIONS } from "../../../redux/selected.reducer";
import ActiveLib from "../../types/lib.enum";
import NewUpdatedBanner from "../new-updated-banner";
import TileCard from "../tile-card";
import { BasicObject } from "../../types/shared.type";

const ProjectCard: React.FC<{
  data: Project | CategoryInfo;
  selected: Project | CategoryInfo;
  isMobile: boolean;
}> = ({
  data, selected, isMobile
}) => {
  const dispatch = useDispatch<Dispatch<SelectAction>>();
  const {
    lib,
    projectsByCategory
  } = useTypedSelector(({lib, tables}) => ({
    lib,
    projectsByCategory: tables.loaded.projectsByCategory
  }))
  const thisRef = useRef<HTMLDivElement>(null);
  
  const { displayName, imageURL } = data;
  const selectedName = selected && selected.displayName ? selected.displayName : '';
  const cardIsSelected = !!selectedName && selectedName === displayName;

  const selectCard = () => {
    dispatch({
      type: SELECTED_ACTIONS.SET,
      data,
      projectSet: projectsByCategory as BasicObject<Project[]>
    });
  };
  
  const highlight = classNames({ "card-selected": cardIsSelected });

  if (cardIsSelected && thisRef.current) {
    thisRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  let sizing = isMobile ? 'p-col-6' : 'p-col-2'; // show all
  if (!isMobile && !!selectedName) {
    // not mobile, card selected -> condense to share w/ fullcard
    sizing = lib === ActiveLib.PROJECT ? 'p-col-6': 'p-col-12';
  }

  return (
    <div key={displayName} ref={thisRef} style={{position: 'relative'}} className={sizing}>
      <NewUpdatedBanner data={data} />
      <TileCard mainText={displayName} imageURL={imageURL} actions={[{fn: selectCard}]} className={highlight}/>
    </div>
  );
}
export default ProjectCard;