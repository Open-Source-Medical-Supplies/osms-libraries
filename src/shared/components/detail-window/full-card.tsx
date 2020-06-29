import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CategoryInfo, CategoryInfoType } from '../../../classes/category-info.class';
import { ProjectType } from '../../../classes/project.class';
import ImageCarousel from './image-carousel';

const urlRegexMatch = new RegExp(/\[\d+\]/);
/**
 * Airtable sends MD Links similar to -> 'some url text[1] [1]: https://example.com'
 * @param {string} md 
 * @returns {string}
 */
const fixURLS = (md: string) => {
  if (urlRegexMatch.test(md)) {
    const urlArr = md.split(urlRegexMatch);
    const mid = Math.round(urlArr.length / 2);
    let tempMD = '';
    for (let i = 0, j = mid; i < (mid - 1); i++, j++) {
      const linkDesc = urlArr[i] 
      // slice(2,n) removes ': ' from the front, trim removes whitespace and carriage returns from the end
      const n = urlArr[j].length;
      const link = `(${urlArr[j].slice(2,n).trim()})`;
      tempMD += linkDesc + link;
    }
    return tempMD;
  }
  return md;
}

const FullCard = ({
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
    md = fixURLS(md);

    return <div key={sectionName}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} className='markdown-section' linkTarget='_blank' />
    </div>
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
export default FullCard;