import React from 'react';
import ReactMarkdown from 'react-markdown';
import { fixMdUrls } from '../../utility/general.utility';
import ListItemHandler from './list-item-handler';

const unnestParaInList = (el: any): JSX.Element => {
  if (el && el.children && el.children[0] && el.children[0].props && el.children[0].props.value && el.children[0].props.value.includes('Fabric masks')) {
    debugger
  }
  return <div>hi</div>;
}

const MarkdownSection = (sectionName: string, md: string, className = '', force = false) => (
  md || force ?
  <div
    key={sectionName}
    className={className + ' markdown-section'}>
    <h3>{sectionName}</h3>
    <ReactMarkdown
      source={fixMdUrls(md)}
      renderers={{listItem: ListItemHandler}}/>
  </div> : null
);

export default MarkdownSection