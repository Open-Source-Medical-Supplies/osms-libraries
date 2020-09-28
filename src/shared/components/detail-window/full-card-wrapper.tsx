import React from "react";

const FullCardWrapper = ({
  headerImage,
  displayName,
  CardInfo,
	Links,
	footer = null
}: {
  headerImage: JSX.Element;
  displayName: string;
  CardInfo: () => JSX.Element;
	Links: () => JSX.Element;
	footer?: JSX.Element | null
}) => {
  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{displayName}</h1>
        <CardInfo />
        <Links />
      </div>
			{footer}
    </div>
  );
};

export default FullCardWrapper;