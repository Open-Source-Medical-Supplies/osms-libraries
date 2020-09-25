import { Button } from "primereact/button";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { setLib } from "../../redux/actions/lib.action";
import { setSelectedByName } from "../../redux/actions/selected.action";
import { useTypedSelector } from "../../redux/root.reducer";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import BackToOrigin from "../../shared/components/back-to-origin";
import FullCardWrapper from "../../shared/components/detail-window/full-card-wrapper";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import ActiveLib from "../../shared/types/lib.enum";
import { openExternal } from "../../shared/utility/general.utility";
import { getLang } from "../../shared/utility/language.utility";
import SelectedImageCarousel, {
  CarouselItem,
  CarouselItems
} from "./selected-card-image-carousel";

const ProjectFullCard = () => {
  const dispatch = useDispatch();
  const { selected } = useTypedSelector(({ selected }) => ({
    selected,
  }));
  const Lang = getLang();

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

  const goToCategory = (nom: string) => {
    dispatch(setLib(ActiveLib.CATEGORY));
    dispatch(
      setSelectedByName(
        nom,
        "displayName",
        "CategoryInfo",
        ActiveLib.CATEGORY,
        selected.data
      )
    );
  };

  const goToCategoryButton = (nom: string) => (
    <button
      key={nom}
      onClick={() => goToCategory(nom)}
      className="button-link-style"
    >
      <h2>{nom}</h2>
    </button>
  );

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
          <div className="tile-card__header">
            {item.originalTitle}
          </div>
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
        { links && links.length ? 
            SelectedImageCarousel({
              items: LinkMap,
              showFullscreenButton: false,
              showPlayButton: LinkMap.length > 1
            }) : <div>No associated materials on file</div>
        }
      </React.Fragment>
    )
  };

  const CardInfo = () => (
    <React.Fragment>
      <BackToOrigin origin={selected.origin}/>
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
