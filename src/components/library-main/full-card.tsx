import React from "react";
import ActiveLib from "../../shared/types/lib.enum";
import CategoryLibFullCard from "../category-library/category-library.full-card";
import ProjectFullCard from "../project-library/project-library.full-card";

const FullCard = ({ lib }: { lib: ActiveLib }) =>
  lib === ActiveLib.CATEGORY ? <CategoryLibFullCard /> : <ProjectFullCard />;

export default FullCard;
