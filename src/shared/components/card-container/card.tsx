import classNames from "classnames";
import React, { Dispatch, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import { SELECTED_ACTIONS } from "../../constants/selected.constants";
import ActiveLib from "../../types/lib.enum";
import { SelectAction, Selected } from "../../types/selected.type";
import { getParam, PARAMS } from "../../utility/param-handling";
import NewUpdatedBanner from "../new-updated-banner";
import TileCard from "../tile-card";

const ProjectCard: React.FC<{
  data: Selected;
  selected: Selected;
  isMobile: boolean;
}> = ({
  data, selected, isMobile
}) => {
  const dispatch = useDispatch<Dispatch<SelectAction>>();
  const tables = useTypedSelector(({ tables }) => tables);
  const thisRef = useRef<HTMLDivElement>(null);

  if (!data) return null;
  
  const { displayName, imageURL } = data;
  const selectedName = selected && selected.displayName ? selected.displayName : '';
  const cardIsSelected = !!selectedName && selectedName === displayName;

  const selectCard = () => {
    dispatch({
      type: SELECTED_ACTIONS.SET_SELECTED,
      data,
      supportingDataSet: tables.loaded
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

  const sizing = isMobile ? 'p-col-6' : 'p-col-2'; // show all

  return (
    <div key={displayName} ref={thisRef} style={{position: 'relative'}} className={sizing}>
      <NewUpdatedBanner data={data} />
      <TileCard mainText={displayName} imageURL={imageURL} actions={[{fn: selectCard}]} className={highlight}/>
    </div>
  );
}
export default ProjectCard;