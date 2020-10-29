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
  const [state, setState] = useState("pi pi-window-maximize");

  const fullscreenUpdate = useCallback(() => {
    if (!!document.fullscreenElement) {
      setState("pi pi-window-maximize");
      document.exitFullscreen();
    } else {
      setState("pi pi-window-minimize");
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
