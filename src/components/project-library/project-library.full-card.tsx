import { Button } from "primereact/button";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import { useTypedSelector } from "../../redux/root.reducer";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import TileCard from "../../shared/components/tile-card";
import {
  AopenExternal,
  openExternal
} from "../../shared/utility/general.utility";
import { genLocalParam } from '../../shared/utility/param-handling';
import ActiveLib from "../../shared/types/lib.enum";
import { TABLE_MAPPING } from "../../shared/constants/google-bucket.constants";
import { BasicObject } from "../../shared/types/shared.type";

const ProjectFullCard = () => {
  const { lang, selected } = useTypedSelector(({ tables, selected }) => ({
    lang: tables.loaded[TABLE_MAPPING.Translations] as BasicObject<string>,
    selected,
  }));
  if (!selected || !(selected.data instanceof Project)) return <div></div>;
  const links = selected.supportingData as Material[];
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
  } = selected.data;

  const linkAcross = name instanceof Array ? 
    genLocalParam( ActiveLib.CATEGORY, name[0] ) :
    genLocalParam( ActiveLib.CATEGORY, name );

	const headerImage =
		typeof imageURL !== "string" ? (
			<div className="center-flex" style={{ height: "152px" }}>
				No image available
			</div>
		) : (
			<img
				className="centered-image"
				alt={displayName}
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
					label={lang['makeIt']}
					icon="pi pi-external-link"
					iconPos="right"
					className="p-button-raised p-button-rounded margin-z-auto"
				/>
			</span>
		) : null;

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
				<h1>{displayName}</h1>
				{AopenExternal(linkAcross, <h2>{name}</h2>)}
				{desc}
				{attributionOrg || creator ? (
					<div className="p-grid">
						{MarkdownSection("Attribution Organization",attributionOrg,"p-col")}
						{MarkdownSection("Creator", creator, "p-col")}
					</div>
				) : null}
				{MarkdownSection(medicalStatus, reviewedBy, "", true)}
				{MarkdownSection("Sources", hyperLinkText)}
        {ImageCarousel<Material>({
          links,
          cardTemplate: ICCardTemplate
        })}
			</div>
			{footer}
		</div>
	);
};
export default ProjectFullCard;
