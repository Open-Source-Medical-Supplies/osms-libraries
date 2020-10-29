import { Button } from "primereact/button";
import React, { useCallback, useEffect, useState } from "react";

const fullscreenOn = (el: any | null) => {
  if (!el) return;

	if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  }
};

const FullscreenToggle = () => {
  const [state, setState] = useState("fas fa-expand-alt");

  const fullscreenUpdate = useCallback(() => {
    if (!!document.fullscreenElement) {
      setState("fas fa-expand-alt");
      document.exitFullscreen();
    } else {
      setState("fas fa-compress-alt");
      fullscreenOn(document.getElementById("osms-lib"));
    }
	}, []);

  return (
    <Button
      className="mobile-button__square"
      type="button"
      icon={state}
      onClick={() => fullscreenUpdate()}
    ></Button>
  );
};

export default FullscreenToggle;
