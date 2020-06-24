import React from 'react';
import ProjectCard from './card';
import { BasicObject } from '../../../types/shared.type';
import { Card } from '../../../types/card.type';

const CardContainer = ({
  records, cardChange, selectedCard, isMobile
}: {
  records: BasicObject<any>, cardChange: Function, selectedCard: Card, isMobile: boolean
}) => {
  return (
    <div  id='app__card-container' className='p-grid'>
      {
        records.reduce((acc: JSX.Element[], fields: any) => {
            acc.push(
              // <ProjectCard
              //   key={fields['Medical Supply Category']}
              //   data={fields}
              //   isMobile={isMobile}
              //   setCard={cardChange}
              //   selectedCard={selectedCard}/>
            ); 
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;