import { Button } from "primereact/button";
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { libToCatAndSelectCategory } from "../../redux/actions/shared.action";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import BackToOrigin from "../../shared/components/back-to-origin";
import FullCardWrapper from "../../shared/components/detail-window/full-card-wrapper";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import { BasicObject } from "../../shared/types/shared.type";
import { openExternal } from "../../shared/utility/general.utility";
import { getLang } from "../../shared/utility/language.utility";
import SelectedImageCarousel, {
  CarouselItem,
  CarouselItems,
} from "./selected-card-image-carousel";

const ProjectFullCard = () => {
  const dispatch = useDispatch();
  const { selected, categoryInfo } = useTypedSelector(
    ({ selected, tables }) => ({
      selected,
      categoryInfo: tables.loaded[TABLE_MAPPING.CategoryInfo] as CategoryInfo[],
    })
  );
  const Lang = getLang();
  /** Used to prevent a go-to-cat button from showing up if it doesn't have an actual category */
  const catDict = useMemo(() => categoryInfo?.reduce((acc, cat) => {
    acc[cat.displayName] = true;
    return acc;
  }, {} as BasicObject<boolean>), [categoryInfo]);

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

  const goToCategoryButton = (nom: string) => {
    const goToCat = () =>
      dispatch(libToCatAndSelectCategory(nom, selected.data));
    if (catDict[nom]) {
      return (
        <Button
          className="p-button-raised p-button-rounded mb-1"
          onClick={goToCat}
          icon="pi pi-eye"
          iconPos="right"
          label={nom}
      ></Button>
      );
    } else {
      return null;
    }
  };

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
          label={Lang.get("makeIt")}
          icon="pi pi-external-link"
          iconPos="right"
          className="p-button-raised p-button-rounded margin-z-auto"
        />
      </span>
    ) : null;

  const ICCardTemplate = (item: CarouselItem) => {
    // const { idealCaption, imageURL, detail } = data;
    return (
      <div>
        <img
          className="image-gallery-image"
          src={item.original}
          alt={item.originalAlt}
          srcSet={item.srcSet}
          sizes={item.sizes}
          title={item.originalTitle}
        />

        <div className="image-gallery-description">
          <div className="tile-card__header">{item.originalTitle}</div>
          {item.description ? (
            <ReactMarkdown source={item.description} />
          ) : null}
        </div>
      </div>
    );
  };

  const Links = () => {
    // const { idealCaption, imageURL, detail } = data;
    const LinkMap: CarouselItems = links.map((data) => {
      return {
        data,
        thumbnail: data.imageRaw?.thumbnails.small.url,
        original: data.imageRaw?.thumbnails.large.url,
        fullscreen: data.imageRaw?.thumbnails.full.url,
        originalTitle: data.idealCaption,
        description: data.detail,
        renderItem: (item: CarouselItem) => ICCardTemplate(item),
        originalAlt: data.idealCaption,
        thumbnailAlt: data.idealCaption,
      };
    });

    return (
      <React.Fragment>
        <h3>Materials</h3>
        {links && links.length ? (
          SelectedImageCarousel({
            items: LinkMap,
            showFullscreenButton: false,
            showPlayButton: LinkMap.length > 1,
          })
        ) : (
          <div>No associated materials on file</div>
        )}
      </React.Fragment>
    );
  };

  const CardInfo = () => (
    <React.Fragment>
      <BackToOrigin
        origin={selected.origin}
        displayName={selected.origin?.displayName}
      />
      <div className="full-card__category-buttons">
        {name instanceof Array
          ? name.map((nom) => goToCategoryButton(nom))
          : goToCategoryButton(name)}
      </div>
      {desc}
      {attributionOrg || creator ? (
        <div className="p-grid">
          {MarkdownSection("Attribution Organization", attributionOrg, "p-col")}
          {MarkdownSection("Creator", creator, "p-col")}
        </div>
      ) : null}
      {MarkdownSection(medicalStatus, reviewedBy, "", true)}
      {MarkdownSection("Sources", hyperLinkText)}
    </React.Fragment>
  );

  return (
    <FullCardWrapper
      headerImage={headerImage}
      displayName={displayName}
      CardInfo={CardInfo}
      Links={Links}
      footer={footer}
    />
  );
};
export default ProjectFullCard;
