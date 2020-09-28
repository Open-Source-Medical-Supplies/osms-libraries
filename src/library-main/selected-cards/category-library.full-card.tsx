import { Button } from "primereact/button";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { filterFromCategoryToProjects } from "../../redux/actions/shared.action";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { Project } from "../../shared/classes/project.class";
import BackToOrigin from "../../shared/components/back-to-origin";
import FullCardWrapper from "../../shared/components/detail-window/full-card-wrapper";
import MarkdownSection from "../../shared/components/markdown/markdown-section";
import { Indexable } from "../../shared/types/shared.type";
import { getLang } from "../../shared/utility/language.utility";
import SelectedImageCarousel, {
  CarouselItems,
} from "./selected-card-image-carousel";
import { linkAcross } from "../../redux/actions/shared.action";

const CategoryLibFullCard = () => {
  const dispatch = useDispatch();
  const Lang = getLang();

  const { selected } = useTypedSelector(({ selected }) => ({
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

  const categoryLinkAcross = (data: Project) =>
    linkAcross(data, displayName, selected.data);

  const Links = () => {
    const LinkMap: CarouselItems = links.map((data) => {
      return {
        data,
        thumbnail: data.imageRaw?.thumbnails?.small.url,
        original: data.imageRaw?.thumbnails?.large.url,
        fullscreen: data.imageRaw?.thumbnails?.full.url,
        description: data.displayName,
        originalAlt: data.displayName,
        thumbnailAlt: data.displayName,
      };
    });

    return (
      <React.Fragment>
        <h3>Projects</h3>
        {links && links.length ? (
          <React.Fragment>
            <Button
              className="p-button-raised p-button-rounded mb-1"
              onClick={() => dispatch(filterFromCategoryToProjects(displayName))}
              icon="pi pi-filter"
              iconPos="right"
              label={Lang.get("viewAllProjects")}
            ></Button>
            {SelectedImageCarousel({
              items: LinkMap,
              actions: { external: true, across: true },
              linkAcross: categoryLinkAcross,
              showPlayButton: LinkMap.length > 1,
            })}
          </React.Fragment>
        ) : (
          <div>No associated projects on file</div>
        )}
      </React.Fragment>
    );
  };

  const CardInfo = () => {
    return (
      <React.Fragment>
        <BackToOrigin origin={selected.origin} displayName={displayName} />
        {countSections ? (
          CategoryInfo.CardSections.map(({ key, value }) => {
            return MarkdownSection(value, (selected.data as Indexable)[key]);
          })
        ) : (
          <div>No category information on file</div>
        )}
      </React.Fragment>
    );
  };

  return (
    <FullCardWrapper
      headerImage={headerImage}
      displayName={displayName}
      CardInfo={CardInfo}
      Links={Links}
    />
  );
};
export default CategoryLibFullCard;
