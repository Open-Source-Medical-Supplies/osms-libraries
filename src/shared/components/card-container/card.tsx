import classNames from "classnames";
import React, { Dispatch, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import { SELECTED_ACTIONS } from "../../constants/selected.constants";
import { SelectAction, Selected } from "../../types/selected.type";
import NewUpdatedBanner from "../new-updated-banner";
import TileCard, { TileCardActions } from "../tile-card";
import ActiveLib, { ActiveLibToClassName } from "../../types/lib.enum";

const ProjectCard: React.FC<{data: Selected;}> = ({ data }) => {
  const dispatch = useDispatch<Dispatch<SelectAction>>();
  const { isMobile, selected, tables, lib } = useTypedSelector(
    ({ tables, selected, env, lib }) => ({
      isMobile: env.isMobile,
      selected: selected.data,
      tables,
      lib
    })
  );
  const thisRef = useRef<HTMLDivElement>(null);
  const selectCard = useCallback(() => {
    dispatch({
      type: SELECTED_ACTIONS.SET_SELECTED,
      data,
      supportingDataSet: tables.loaded,
    });
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  // const fitlerByCategory = useCallback(() => {
  //   dispatch({
  //     type: SELECTED_ACTIONS.SET_SELECTED,
  //     data,
  //     supportingDataSet: tables.loaded,
  //   });
  // }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data) return null;

  const { displayName, imageURL } = data;
  const selectedName = selected?.displayName ? selected.displayName : "";
  const cardIsSelected = !!selectedName && selectedName === displayName;

  const actions: TileCardActions = [
    {
      fn: selectCard
    }
  ]

  if (lib.active === ActiveLib.CATEGORY) {
    actions.push({
      fn: () => console.log('category filter-linking todo'),
      label: null,
      icon: 'filter',
    })
  }

  const highlight = classNames({ "card-selected": cardIsSelected });

  if (cardIsSelected && thisRef.current) {
    thisRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  const sizing = isMobile ? "p-col-6" : "p-col-2"; // show all

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
