import { Button } from "primereact/button";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { setLib } from "../../redux/actions/lib.action";
import { setSelectedByName } from "../../redux/actions/selected.action";
import { useTypedSelector } from "../../redux/root.reducer";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import ImageCarousel from "../../shared/components/detail-window/image-carousel";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import TileCard from "../../shared/components/tile-card";
import ActiveLib from "../../shared/types/lib.enum";
import { openExternal } from "../../shared/utility/general.utility";
import { getLang } from "../../shared/utility/language.utility";

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
    dispatch(setSelectedByName(nom, 'displayName', 'CategoryInfo', ActiveLib.CATEGORY))
  };

  const goToCategoryButton = (nom: string) => (
    <button key={nom} onClick={() => goToCategory(nom)} className='button-link-style'> <h2>{nom}</h2></button>
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

  const ICCardTemplate = (data: Material) => {
    const { idealCaption, imageURL, detail } = data;
    return (
      <TileCard
        mainText={idealCaption}
        imageURL={imageURL}
        className={"fullcard-carousel-cards"}
      >
        <div className="tile-card__header clamp-2"> {idealCaption} </div>
        {detail ? <ReactMarkdown source={detail} /> : null}
      </TileCard>
    );
  };

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{displayName}</h1>
        <div className='full-card__category-buttons'>
          {
            name instanceof Array ?
              name.map(nom => goToCategoryButton(nom)) :
              goToCategoryButton(name)
          }
        </div>
        {desc}
        {attributionOrg || creator ? (
          <div className="p-grid">
            {MarkdownSection(
              "Attribution Organization",
              attributionOrg,
              "p-col"
            )}
            {MarkdownSection("Creator", creator, "p-col")}
          </div>
        ) : null}
        {MarkdownSection(medicalStatus, reviewedBy, "", true)}
        {MarkdownSection("Sources", hyperLinkText)}
        {ImageCarousel<Material>({
          links,
          cardTemplate: ICCardTemplate,
        })}
      </div>
      {footer}
    </div>
  );
};
export default ProjectFullCard;
