import { Carousel } from "primereact/carousel";
import React from "react";

export interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

const ImageCarousel = <T extends any>({
  links,
  cardTemplate,
  numVisible = 3,
  numScroll = 2,
  circular = true,
  responsiveOptions
}: {
  links: T[];
  cardTemplate: (data: T) => JSX.Element;
  numVisible?: number;
  numScroll?: number;
  circular?: boolean;
  responsiveOptions?: ResponsiveOption[]
}) => {
  responsiveOptions = responsiveOptions || [
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

  return links && links.length ?
    <Carousel
      circular={circular}
      value={links}
      itemTemplate={cardTemplate}
      numVisible={numVisible}
      numScroll={numScroll}
      responsiveOptions={responsiveOptions}
    /> : null;
};

export default ImageCarousel;
