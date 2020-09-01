import classNames from "classnames";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelected } from "../../../redux/actions/selected.action";
import { useTypedSelector } from "../../../redux/root.reducer";
import ActiveLib from "../../types/lib.enum";
import { Selected } from "../../types/selected.type";
import NewUpdatedBanner from "../new-updated-banner";
import TileCard, { TileCardActions } from "../tile-card";
import { filterFromCategoryToProjects } from "../../../redux/actions/shared.action";

const ProjectCard: React.FC<{data: Selected;}> = ({ data }) => {
  const dispatch = useDispatch();
  const { selected, lib } = useTypedSelector(
    ({ selected, lib }) => ({ selected: selected.data, lib })
  );
  const thisRef = useRef<HTMLDivElement>(null);
  const selectCard = useCallback(() => {
    dispatch(setSelected(data));
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data) return null;

  const { displayName, imageURL } = data;
  const selectedName = selected?.displayName ? selected.displayName : "";
  const cardIsSelected = !!selectedName && selectedName === displayName;

  const actions: TileCardActions = [];
  actions.push({ fn: selectCard });
  if (lib.active === ActiveLib.CATEGORY) {
    // add filtering icon for category cards
    actions.push({
      fn: () => dispatch(filterFromCategoryToProjects(displayName)),
      label: null,
      icon: 'filter',
    });
  }

  const highlight = classNames({ "card-selected": cardIsSelected });

  if (cardIsSelected && thisRef.current) {
    thisRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  // must be divisors of 12
  const sizing = 'p-xs-6 p-sm-4 p-md-3 p-lg-3 p-xl-2';
  return (
    <div
      key={displayName}
      ref={thisRef}
      style={{ position: "relative" }}
      className={sizing}
    >
      <NewUpdatedBanner data={data} />
      <TileCard
        mainText={displayName}
        imageURL={imageURL}
        actions={actions}
        className={highlight}
      />
    </div>
  );
};
export default ProjectCard;
