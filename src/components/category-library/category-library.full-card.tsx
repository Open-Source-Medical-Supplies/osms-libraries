import React from 'react';
import { CategoryInfo } from '../../classes/category-info.class';
import { Project } from '../../classes/project.class';
import ImageCarousel from '../../shared/components/detail-window/image-carousel';
import { MarkdownSection } from '../../shared/components/markdown-section';
import TileCard from '../../shared/components/tile-card';
import { openExternal } from '../../shared/utility/general.utility';

const CategoryLibFullCard = ({
  selected, links
}: {
  selected: Project | CategoryInfo; 
  links: Project[];
}) => {
  if (!selected) return <div></div>;

  const {categoryName, imageURL} = selected;
  
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={categoryName} src={imageURL} style={{ height: '250px' }}/>
  )

  const ICCardTemplate = (data: Project) => {
    const { name, imageURL, externalLink, baseID } = data;

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
    ];

    return (
      <TileCard
        mainText={name}
        imageURL={imageURL}
        buttonIcon='external-link'
        actions={actions}/>
    );
  };

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{categoryName}</h1>
        {Array.from(
          CategoryInfo.CardSections,
          ([key, label]) => selected[key] ? MarkdownSection(label, selected[key]) : null
        )}
        {ImageCarousel<Project>({
          links: links,
          cardTemplate: ICCardTemplate
        })}
      </div>
    </div>
  );
}
export default CategoryLibFullCard;