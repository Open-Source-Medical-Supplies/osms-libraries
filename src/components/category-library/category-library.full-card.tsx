import React, { useMemo } from "react";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Project } from "../../shared/classes/project.class";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import TileCard from "../../shared/components/tile-card";
import ActiveLib from "../../shared/types/lib.enum";
import { Indexable } from "../../shared/types/shared.type";
import { openExternal } from "../../shared/utility/general.utility";
import { genLocalParam } from "../../shared/utility/param-handling";

const CategoryLibFullCard = () => {
  const { lang, selected } = useTypedSelector(({ lang, selected }) => ({
    lang,
    selected,
  }));
  const countSections = useMemo(() => {
    if (selected.data) {
      return !!CategoryInfo.CardSections.reduce(
        (a, v) => ((selected.data as Indexable)[v.key] ? (a += 1) : a),
        0
      );
    }
    return false;
  }, [selected.data]);
  if (!selected.data) return <div></div>;
  const links = selected.supportingData as Project[];
  const { displayName, imageURL } = selected.data as CategoryInfo;
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
    const linkAcross = genLocalParam(ActiveLib.PROJECT, displayName);
    const actions = [
      {
        label: lang["viewSource"],
        icon: "external-link",
        fn: openExternal(externalLink),
      },
      {
        label: lang["viewDetails"],
        icon: "eye",
        fn: openExternal(linkAcross),
      },
    ];

    return (
      <TileCard
        className={"fullcard-carousel-cards"}
        mainText={displayName}
        imageURL={imageURL}
        buttonIcon="external-link"
        actions={actions}
      />
    );
  };

  const Links = () => {
    return links && links.length ? (
      <React.Fragment>
        <h3>Projects</h3>
        {ImageCarousel<Project>({
          links,
          cardTemplate: ICCardTemplate,
        })}
      </React.Fragment>
    ) : (
      <div>
        No associated projects on file
      </div>
    )
  }

  const CardInfo = () => {
    return (
      <React.Fragment>
        {
          countSections ? 
          CategoryInfo.CardSections.map(({ key, value }) => {
            return MarkdownSection(value, (selected.data as Indexable)[key]);
          }) :
          <div>
            No category information on file
          </div>
        }
      </React.Fragment>
    )
  }

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{displayName}</h1>
        <CardInfo />
        <Links/>
      </div>
    </div>
  );
};
export default CategoryLibFullCard;
