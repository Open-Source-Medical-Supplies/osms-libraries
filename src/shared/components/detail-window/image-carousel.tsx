import { Carousel } from "primereact/carousel";
import React from "react";
import { CategoryInfoType } from "../../../classes/category-info.class";
import { ProjectType } from "../../../classes/project.class";
import { openExternal } from "../../utility/general.utility";
import TileCard from "../tile-card";

const ImageCarousel = ({ links }: { links: ProjectType[] }) => {
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

  
  const cardTemplate = (data: ProjectType | CategoryInfoType) => {
    const {
      name, imageURL, externalLink, baseID
    } = data;

    const actions = [
      {
        label: 'View Source',
        icon: 'external-link',
        fn: openExternal(externalLink)
      },
      {
        label: 'View Details',
        icon: 'eye',
        fn: openExternal('/libraries/project-library/?project=' + baseID)
      }
    ]

    return (
      <TileCard
        displayName={name}
        imageURL={imageURL}
        buttonIcon='external-link'
        actions={actions}/>
    );
  };

  return (
    <Carousel
      value={links}
      itemTemplate={cardTemplate}
      numVisible={3}
      numScroll={2}
      responsiveOptions={responsiveOptions}
    ></Carousel>
  );
};

export default ImageCarousel;
