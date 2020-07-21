import React from 'react';
import ReactMarkdown from 'react-markdown';
import { fixMdUrls } from '../utility/general.utility';

const MarkdownSection = (sectionName: string, md: string, className = '', force = false) => (
  md || force ?
  <div key={sectionName} className={className || ''}>
    <h3>{sectionName}</h3>
    <ReactMarkdown source={fixMdUrls(md)} />
  </div> : null
);

export default MarkdownSection