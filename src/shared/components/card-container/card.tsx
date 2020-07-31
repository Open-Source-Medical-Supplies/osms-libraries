import classNames from "classnames";
import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { CategoryInfo } from "../../../classes/category-info.class";
import { Project } from '../../../classes/project.class';
import { RootState } from "../../../redux/root.reducer";
import ActiveLib from "../../../types/lib.enum";
import { PARAMS, updateQueryParam } from "../../utility/param-handling";
import NewUpdatedBanner from "../new-updated-banner";
import TileCard from "../tile-card";

const ProjectCard: React.FC<{
  data: Project | CategoryInfo;
  setCard: Function;
  selected: Project | CategoryInfo;
  isMobile: boolean;
}> = ({
  data, setCard, selected, isMobile
}) => {
  const lib = useSelector<RootState, ActiveLib>(({lib}) => lib)
  const thisRef = useRef<HTMLDivElement>(null);
  
  const { displayName, imageURL } = data;
  const selectedName = selected && selected.displayName ? selected.displayName : '';
  const cardIsSelected = !!selectedName && selectedName === displayName;

  const selectCard = () => {
    updateQueryParam({key: PARAMS.SELECTED, val: displayName});
    setCard({selected: data, visible: true});
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