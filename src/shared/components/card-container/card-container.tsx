import React from 'react';
import { CategoryType } from '../../../classes/category.class';
import { ProjectType } from '../../../classes/project.class';
import { BasicObject } from '../../../types/shared.type';
import ProjectCard from './card';

const CardContainer = ({
  records, cardChange, selectedCard, isMobile
}: {
  records: BasicObject<any>;
  cardChange: Function;
  selectedCard: ProjectType | CategoryType;
  isMobile: boolean;
}) => {
  return (
    <div  id='app__card-container' className='p-grid'>
      {
        records.reduce((acc: JSX.Element[], fields: any) => {
            acc.push(
              <ProjectCard
                key={fields['Medical Supply Category']}
                data={fields}
                isMobile={isMobile}
                setCard={cardChange}
                selectedCard={selectedCard}/>
            ); 
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;