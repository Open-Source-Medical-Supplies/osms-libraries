import React from 'react';
import { CategoryInfoType } from '../../../classes/category-info.class';
import { ProjectType } from '../../../classes/project.class';
import { BasicObject } from '../../../types/shared.type';
import ProjectCard from './card';

const CardContainer = ({
  records, cardChange, selected, isMobile
}: {
  records: BasicObject<any>;
  cardChange: Function;
  selected: ProjectType | CategoryInfoType;
  isMobile: boolean;
}) => {
  return (
    <div  id='app__card-container' className='p-grid'>
      {
        records.reduce((acc: JSX.Element[], fields: CategoryInfoType) => {
            acc.push(
              <ProjectCard
                key={fields.categoryKey}
                data={fields}
                isMobile={isMobile}
                setCard={cardChange}
                selected={selected}/>
            ); 
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;