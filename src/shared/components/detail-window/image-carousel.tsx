import { Carousel } from "primereact/carousel";
import React from "react";

const ImageCarousel = <T extends any>({
  links,
  cardTemplate
}: {
  links: T[];
  cardTemplate: (data: T) => JSX.Element;
}) => {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    links.length ? <Carousel
      value={links}
      itemTemplate={cardTemplate}
      numVisible={3}
      numScroll={2}
      responsiveOptions={responsiveOptions}
    ></Carousel> : null
  );
};

export default ImageCarousel;
