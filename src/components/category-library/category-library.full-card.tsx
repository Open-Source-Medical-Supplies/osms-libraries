import React from "react";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Project } from "../../shared/classes/project.class";
import { useTypedSelector } from "../../redux/root.reducer";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import TileCard from "../../shared/components/tile-card";
import { openExternal } from "../../shared/utility/general.utility";
import { genLocalParam } from "../../shared/utility/param-handling";
import ActiveLib from "../../shared/types/lib.enum";
import { Indexable } from "../../shared/types/shared.type";

const CategoryLibFullCard = ({
	selected,
	links
}: {
	selected: CategoryInfo | undefined;
	links: Project[] | undefined;
}) => {
  const Lang = useTypedSelector(({lang}) => lang);
  
  if (!links) { links = []; }
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
				label: Lang['viewSource'],
				icon: "external-link",
				fn: openExternal(externalLink),
			},
			{
				label: Lang['viewDetails'],
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
        {
          CategoryInfo.CardSections.map(({key, value}) => {
            return MarkdownSection(value, (selected as Indexable)[key])
          })
        }
        { links && links.length ?
          <React.Fragment>
            <h3>Projects</h3>
            {ImageCarousel<Project>({
              links,
              cardTemplate: ICCardTemplate
            })}
          </React.Fragment> : null
        }
			</div>
		</div>
	);
};
export default CategoryLibFullCard;
