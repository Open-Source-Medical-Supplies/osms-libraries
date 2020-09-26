import { Button } from "primereact/button";
import React from "react";
import { useDispatch } from "react-redux";
import { linkAcross } from "../../redux/actions/shared.action";
import { Selected } from "../types/selected.type";

const BackToOrigin = ({
  origin,
  displayName,
}: {
  origin?: Selected;
  displayName?: string;
}) => {
  const dispatch = useDispatch();
  if (!origin || !displayName) {
    return null;
  }

  const takeMeHome = () => {
    dispatch(linkAcross(origin, displayName));
  }

  return (
    <div id="full-card__back-to-origin">
      <Button
        className="p-button-raised p-button-rounded"
        label="Back to previous"
        onClick={takeMeHome}
        iconPos="left"
        icon="pi pi-undo"
      ></Button>
    </div>
  );
};

export default BackToOrigin;
