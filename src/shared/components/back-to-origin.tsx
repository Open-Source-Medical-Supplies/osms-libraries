import { Button } from "primereact/button";
import React from "react";
import { useDispatch } from "react-redux";
import { linkAcross } from "../../redux/actions/shared.action";
import { Project } from "../classes/project.class";
import { Selected } from "../types/selected.type";
import { getLang } from "../utility/language.utility";

const BackToOrigin = ({
  origin,
  displayName,
}: {
  origin?: Selected;
  displayName?: string;
}) => {
  const dispatch = useDispatch();
  const Lang = getLang();
  if (!origin || !displayName) {
    return null;
  }

  const takeMeHome = () => {
    dispatch(linkAcross(origin, displayName));
  };

  const backToText =
    Lang.get("backTo") +
    " " +
    (origin instanceof Project ? Lang.get("project") : Lang.get("category"));

  return (
    <div id="full-card__back-to-origin">
      <Button
        className="p-button-raised p-button-rounded"
        label={backToText}
        onClick={takeMeHome}
        iconPos="left"
        icon="pi pi-undo"
      ></Button>
    </div>
  );
};

export default BackToOrigin;
