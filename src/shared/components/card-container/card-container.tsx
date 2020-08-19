import { DataView } from 'primereact/dataview';
import React from 'react';
import { CategoryInfo } from '../../classes/category-info.class';
import { Project } from '../../classes/project.class';
import ProjectCard from './card';
import './_card-container.scss';
import { Selected } from '../../types/selected.type';

interface CardContainerType {
  records: Array<Project | CategoryInfo>;
  selected: Selected;
  isMobile: boolean;
}

const CardContainer: React.FC<CardContainerType> = ({records, selected, isMobile}) => {
  const MappedCard = (data: Project | CategoryInfo) => {
    const key = data instanceof Project ? data.baseID :  data.categoryKey;
    return <ProjectCard
      key={key}
      data={data}
      isMobile={isMobile}
      selected={selected}/>
  };

  return records.length ?
    <DataView
      className='card-container__data-view'
      value={records}
      layout='grid'
      itemTemplate={MappedCard} /> :
    <div style={{alignSelf: 'center', margin: '0 auto'}}>
      <h3>No records match that criteria</h3>
    </div>
}

export default CardContainer;