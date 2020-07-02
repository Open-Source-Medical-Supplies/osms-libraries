import { Button } from "primereact/button";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Material, MaterialType } from "../../classes/material.class";
import { Project } from "../../classes/project.class";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import { MarkdownSection } from "../../shared/components/markdown-section";
import TileCard from "../../shared/components/tile-card";
import {
  AopenExternal,
  openExternal
} from "../../shared/utility/general.utility";

const ProjectFullCard = ({
	selected,
	materials,
}: {
	selected: Project;
	materials: MaterialType[];
}) => {
  if (!selected) return <div></div>;

	const {
		name,
		displayName,
		reviewedBy,
		medicalStatus,
		imageURL,
		description,
		hyperLinkText,
		attributionOrg,
		creator,
		osmsNotes,
		externalLink,
	} = selected;

	const headerImage =
		typeof imageURL !== "string" ? (
			<div className="center-flex" style={{ height: "152px" }}>
				No image available
			</div>
		) : (
			<img
				className="centered-image"
				alt={name}
				src={imageURL}
				style={{ height: "250px" }}
			/>
		);

	const desc = (
		<section>
			<ReactMarkdown source={description} />
			{MarkdownSection("Notes", osmsNotes)}
		</section>
	);

	const externalLinks = externalLink?.split(";") || [];

	const footer =
		externalLinks && externalLinks[0] ? (
			<span className="full-card__footer">
				<Button
					onClick={openExternal(externalLinks[0])}
					tooltip="Link will open in a new tab"
					label="Make it!"
					icon="pi pi-external-link"
					iconPos="right"
					className="p-button-raised p-button-rounded margin-z-auto"
				/>
			</span>
		) : null;

	const linkOut = window.location.pathname + "?category=" + encodeURI(displayName);

  const ICCardTemplate = (data: Material) => {
    const {idealCaption, imageURL, detail} = data;
    return (
      <TileCard mainText={idealCaption} imageURL={imageURL} className={'fullcard-carousel-cards'} >
        <div className='tile-card__header clamp-1'> {idealCaption} </div>
        { detail ? <ReactMarkdown source={detail}/> : null }
      </TileCard>
    )
  };

	return (
		<div className="full-card">
			<div className="full-card__content">
				{headerImage}
				<h1>{name}</h1>
				{AopenExternal(linkOut, <h2>{displayName}</h2>)}
				{desc}
				{attributionOrg || creator ? (
					<div className="p-grid">
						{MarkdownSection("Attribution Organization",attributionOrg,"p-col")}
						{MarkdownSection("Creator", creator, "p-col")}
					</div>
				) : null}
				{MarkdownSection(medicalStatus, reviewedBy, "", true)}
				{MarkdownSection("Sources", hyperLinkText)}
        {ImageCarousel<MaterialType>({
          links: materials,
          cardTemplate: ICCardTemplate
        })}
			</div>
			{footer}
		</div>
	);
};
export default ProjectFullCard;
