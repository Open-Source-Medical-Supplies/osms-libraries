import { DataView } from 'primereact/dataview';
import React from 'react';
import { CategoryInfo } from '../../../classes/category-info.class';
import { Project } from '../../../classes/project.class';
import ProjectCard from './card';

interface CardContainerType {
  records: Array<Project | CategoryInfo>;
  cardChange: Function;
  selected: Project | CategoryInfo;
  isMobile: boolean;
}

const CardContainer = ({records, cardChange, selected, isMobile}: CardContainerType) => {
  const MappedCard = (data: Project | CategoryInfo) => {
    const key = data instanceof Project ? data.baseID :  data.categoryKey;
   return <ProjectCard
      key={key}
      data={data}
      isMobile={isMobile}
      setCard={cardChange}
      selected={selected}/>
};

  return records.length ?
    <DataView value={records} layout='grid' itemTemplate={MappedCard} /> :
    <div style={{alignSelf: 'center', margin: '0 auto'}}>
      <h3>No records match that criteria</h3>
    </div>
}

export default CardContainer;