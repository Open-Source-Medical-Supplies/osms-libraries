import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import classNames from 'classnames';

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

const EventListeners = [
	'fullscreenchange',
	'webkitfullscreenchange',
	'mozfullscreenchange',
	'MSFullscreenChange'
]

const FullscreenToggle = ({klass}: {klass?: string}) => {
	const [state, setState] = useState("pi pi-window-maximize");
	const setToMax = () => {
		setState("pi pi-window-minimize");
		fullscreenOn(document.getElementById("osms-lib"));
	}
	const setToMin = () => {
		setState("pi pi-window-maximize");
		if (!!document.fullscreenElement) {
			document.exitFullscreen()
		};
	}

  const fullscreenUpdate = () => {
    if (!!document.fullscreenElement) {
			setToMin();
    } else {
      setToMax();
    }
	};

	const escHandler = (e: any) => {
		if (!document.fullscreenElement && !(document as any).webkitIsFullScreen && !(document as any).mozFullScreen && !(document as any).msFullscreenElement) {
			setToMin();
		}
	}

	useEffect(() => {
		EventListeners.forEach(event => {
			document.addEventListener(event, escHandler);
		});

    return () => EventListeners.forEach(event => document.removeEventListener(event, escHandler));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const className = classNames(
	"mobile-button__square",
		klass
	)

  return (
    <Button
      className={className}
      type="button"
      icon={state}
      onClick={() => fullscreenUpdate()}
    ></Button>
  );
};

export default FullscreenToggle;
