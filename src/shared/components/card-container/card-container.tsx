import { DataView } from 'primereact/dataview';
import React from 'react';
import { CategoryInfoType } from '../../../classes/category-info.class';
import { ProjectType } from '../../../classes/project.class';
import ProjectCard from './card';

interface CardContainerType {
  records: Array<ProjectType | CategoryInfoType>;
  cardChange: Function;
  selected: ProjectType | CategoryInfoType;
  isMobile: boolean;
}

const CardContainer = ({records, cardChange, selected, isMobile}: CardContainerType) => {
  const MappedCard = (data: ProjectType | CategoryInfoType) => (
    <ProjectCard
      key={data.categoryKey}
      data={data}
      isMobile={isMobile}
      setCard={cardChange}
      selected={selected}/>
  );

  return records.length ?
    <DataView value={records} layout='grid' itemTemplate={MappedCard} /> :
    <div style={{alignSelf: 'center', margin: '0 auto'}}>
      <h3>No records match that criteria</h3>
    </div>
}

export default CardContainer;