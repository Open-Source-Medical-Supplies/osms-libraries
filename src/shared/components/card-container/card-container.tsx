import { DataView } from 'primereact/dataview';
import React from 'react';
import { CategoryInfo } from '../../classes/category-info.class';
import { Project } from '../../classes/project.class';
import ProjectCard from './card';
import './_card-container.scss';
import { getLang } from '../../utility/language.utility';

interface CardContainerType {
  records: Array<Project | CategoryInfo>;
}

const CardContainer: React.FC<CardContainerType> = ({records}) => {
  const Lang = getLang();
  const MappedCard = (data: Project | CategoryInfo) => {
    const key = data instanceof Project ? data.baseID :  data.categoryKey;
    return <ProjectCard key={key} data={data}/>
  };

  return records.length ?
    <DataView
      className='card-container__data-view'
      value={records}
      layout='grid'
      itemTemplate={MappedCard} /> :
    <div style={{alignSelf: 'center', margin: '0 auto'}}>
      <h3>{Lang.get('noRecordsMatch')}</h3>
    </div>
}

export default CardContainer;