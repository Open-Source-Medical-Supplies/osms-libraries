import { Button } from "primereact/button";
import React, { Dispatch, useCallback, useMemo, useRef } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useDispatch } from "react-redux";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import { openExternal } from "../../shared/utility/general.utility";
import { getLang } from "../../shared/utility/language.utility";

export interface CarouselItem extends ReactImageGalleryItem {
	data: Project | Material;
};
export type CarouselItems = CarouselItem[];
interface ActionType {
	label: string;
	icon: string;
	fn: Function | undefined;
}

const getActions = (
  Lang: ReturnType<typeof getLang>,
  linkAcross: Function | undefined,
  dispatch: Dispatch<any>
) => ({
  external: (link: string) => ({
    label: Lang.get("viewSource"),
    icon: "pi pi-external-link",
    fn: openExternal(link),
  }),
  across: (data: Project | Material) => ({
    label: Lang.get("viewDetails"),
    icon: "pi pi-eye",
    fn: linkAcross && (() => dispatch(linkAcross(data))) as Function,
  }),
});

const buttonEl = (action: ActionType) => (
	<Button
		className="p-button-raised p-button-rounded selected-image-carousel__link"
		key={action.label}
		onClick={() => action.fn ? action.fn() : null}
		label={action.label}
		icon={action.icon}
		iconPos="right"
	/>
)

const SelectedImageCarousel = ({
  items,
  actions,
	linkAcross,
	showFullscreenButton = true,
	showPlayButton = true
}: {
  items: CarouselItems;
  actions?: { external?: boolean; across?: boolean };
	linkAcross?: Function;
	showFullscreenButton?: boolean;
	showPlayButton?: boolean;
}) => {
  const Lang = getLang();
  const ref = useRef<ImageGallery | null>();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Actions = useMemo(() => getActions(Lang, linkAcross, dispatch), [
    Lang,
    linkAcross,
	]);
	
  const customControls = useCallback(() => {
    const currentIndex = (ref?.current?.state as any)?.currentIndex;
    if (!actions || currentIndex === undefined) {
      return <div></div>;
    }
    const item = items[currentIndex];

    if (actions.external && !actions.across) {
      const externalLink =
        item.data instanceof Project ? item.data.externalLink : "";
      const externalData = Actions.external(externalLink);
      return (
				<div className='selected-image-carousel__link-container'>
					{buttonEl(externalData)}
				</div>
			);
    } else if (actions.across && !actions.external) {
      const acrossData = Actions.across(item.data);
      return (
				<div className='selected-image-carousel__link-container'>
					{buttonEl(acrossData)}
				</div>
			);
    } else {
      const externalLink =
        item.data instanceof Project ? item.data.externalLink : "";
      const externalData = Actions.external(externalLink);
      const acrossData = Actions.across(item.data);
      return (
        <div className='selected-image-carousel__link-container'>
          <Button
            className="p-button-raised p-button-rounded selected-image-carousel__link"
            key={acrossData.label}
            onClick={() => acrossData.fn ? acrossData.fn() : null}
            label={acrossData.label}
            icon={acrossData.icon}
						iconPos="right"
						style={{marginRight: '0.5rem'}}
          />
          {buttonEl(externalData)}
        </div>
      );
    }
  }, [actions, actions?.across, actions?.external, items]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ImageGallery
      ref={(el) => (ref.current = el)}
      additionalClass="selected-image-carousel"
      items={items}
      showIndex={true}
			lazyLoad={true}
			showFullscreenButton={showFullscreenButton}
			showPlayButton={showPlayButton}
      renderCustomControls={customControls}
    />
  );
};

export default SelectedImageCarousel;
