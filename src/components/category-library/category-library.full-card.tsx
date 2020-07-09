import React from "react";
import { CategoryInfo } from "../../classes/category-info.class";
import { Project } from "../../classes/project.class";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import { MarkdownSection } from "../../shared/components/markdown-section";
import TileCard from "../../shared/components/tile-card";
import { openExternal } from "../../shared/utility/general.utility";
import { genLocalParam } from "../../shared/utility/param-handling";
import ActiveLib from "../../types/lib.enum";
import { Indexable } from "../../types/shared.type";

const CategoryLibFullCard = ({
	selected,
	links,
}: {
	selected: CategoryInfo;
	links: Project[];
}) => {
	if (!selected) return <div></div>;
	const { displayName, imageURL } = selected;
	const headerImage =
		typeof imageURL !== "string" ? (
			<div className="center-flex" style={{ height: "150px" }}>
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

	const ICCardTemplate = (data: Project) => {
		const { displayName, imageURL, externalLink } = data;
		const linkAcross = genLocalParam( ActiveLib.PROJECT, displayName );
		const actions = [
			{
				label: "View Source",
				icon: "external-link",
				fn: openExternal(externalLink),
			},
			{
				label: "View Details",
				icon: "eye",
				fn: openExternal(linkAcross),
			},
		];

		return (
			<TileCard
        className={'fullcard-carousel-cards'}
				mainText={displayName}
				imageURL={imageURL}
				buttonIcon="external-link"
				actions={actions}
			/>
		);
	};

	return (
		<div className="full-card">
			<div className="full-card__content">
				{headerImage}
				<h1>{displayName}</h1>
				{Array.from(CategoryInfo.CardSections, ([key, label]) =>
					(selected as Indexable)[key]
						? MarkdownSection(label, (selected as Indexable)[key])
						: null
				)}
        {ImageCarousel<Project>({
          links,
          cardTemplate: ICCardTemplate
        })}
			</div>
		</div>
	);
};
export default CategoryLibFullCard;
