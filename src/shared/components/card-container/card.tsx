import classNames from "classnames";
import React from 'react';
import { useSelector } from "react-redux";
import { CategoryInfo } from "../../../classes/category-info.class";
import { Project } from '../../../classes/project.class';
import { RootState } from "../../../redux/root.reducer";
import ActiveLib from "../../../types/lib.enum";
import TileCard from "../tile-card";
import { updateQueryParam } from "../../utility/param-handling";

const ProjectCard = ({
  data, setCard, selected, isMobile
}: {
  data: Project | CategoryInfo;
  setCard: Function;
  selected: Project | CategoryInfo;
  isMobile: boolean;
}) => {
  const lib = useSelector<RootState, ActiveLib>(({lib}) => lib)
  const setQueryParam = updateQueryParam(lib);

  const { displayName, imageURL } = data;
  const selectedName = selected && selected.displayName ? selected.displayName : '';

  const selectCard = () => {
    setQueryParam(displayName);
    setCard({selected: data, visible: true});
  };
  
  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === displayName
  });

  let sizing = 'p-col-2'; // default: show all, not mobile
  if (!!selectedName) {
    // condense to share w/ fullcard
    sizing = lib === ActiveLib.PROJECT ? 'p-col-6': 'p-col-12';
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