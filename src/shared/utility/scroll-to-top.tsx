import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';

// adapted from https://github.com/HermanNygaard/react-scroll-to-top

const SCROLL_LIMIT_START = 20;

function scrollToTop() {
  try {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (e) {
    document.documentElement.scrollTop = 0;
  }
}

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onScroll = () => {
    const pos = document.body.scrollTop || document.documentElement.scrollTop;
    setVisible(pos > SCROLL_LIMIT_START);
  };

  return <Button
    style={{opacity: visible ? 1 : 0}}
    className='scroll-to-top button__square'
    icon='pi pi-chevron-up'
    onClick={() => scrollToTop()}/>;
}

export default ScrollToTop;