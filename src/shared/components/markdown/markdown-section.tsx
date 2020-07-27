import React from 'react';
import ReactMarkdown from 'react-markdown';
import { fixMdUrls, notEmptyStr } from '../../utility/general.utility';
import ListItemHandler from './list-item-handler';

const MarkdownSection = (sectionName: string, md: string, className = '', force = false) => (
  notEmptyStr(md) || force ?
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