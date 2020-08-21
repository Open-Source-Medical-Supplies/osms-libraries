import React from "react";
import ReactMarkdown from "react-markdown";
import { notEmptyStr, OpenExternalSafely } from "../../utility/general.utility";
import { fixMdUrls } from "../../utility/airtable-markdown.utility";
import ListItemHandler from "./list-item-handler";

const MarkdownSection = (
  sectionName: string,
  md: string,
  className = "",
  force = false
) => {
  return (md && notEmptyStr(md)) || force ? (
    <div key={sectionName} className={className + " markdown-section"}>
      <h3>{sectionName}</h3>
      <ReactMarkdown
        linkTarget={OpenExternalSafely}
        source={md ? fixMdUrls(md) : ""}
        renderers={{ listItem: ListItemHandler }}
      />
    </div>
  ) : null;
};

export default MarkdownSection;
