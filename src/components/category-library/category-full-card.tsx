import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CategoryInfo, CategoryInfoType } from '../../classes/category-info.class';
import { ProjectType } from '../../classes/project.class';
import ImageCarousel from '../../shared/components/detail-window/image-carousel';
import { fixMDurls } from '../../shared/utility/general.utility';

const CategoryFullCard = ({
  selected, links
}: {
  selected: ProjectType | CategoryInfoType; 
  links: ProjectType[];
}) => {
  if (!selected) return <div></div>;

  const {categoryName, imageURL} = selected;
  
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={categoryName} src={imageURL} style={{ height: '250px' }}/>
  )

  const markdownSection = (sectionName: string, md: string) => {
    return (
      <div key={sectionName}>
        <h3>{sectionName}</h3>
        <ReactMarkdown source={fixMDurls(md)} className='markdown-section' linkTarget='_blank' />
      </div>
    );
  };

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{categoryName}</h1>
        {
          Array.from(CategoryInfo.CardSections, ([key, label]) => selected[key] ? markdownSection(label, selected[key]) : null)
        }
        {links ? <ImageCarousel links={links}/> : null}
      </div>
    </div>
  );
}
export default CategoryFullCard;