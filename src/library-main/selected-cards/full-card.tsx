import React from "react";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import CategoryLibFullCard from "./category-library.full-card";
import ProjectFullCard from "./project-library.full-card";

const FullCard = () => {
  const selected = useTypedSelector(({selected}) => selected);
  return selected.data instanceof CategoryInfo ? <CategoryLibFullCard /> : <ProjectFullCard />;
}

export default FullCard;
