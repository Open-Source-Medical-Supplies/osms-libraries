import React from 'react';
export default <p>hi</p>
// import classNames from "classnames";
// import TileCard from '../tile-card';
// import { Card } from "../../../types/card.type";

// /**
//  * 
//  * @param {string} param 
//  * @returns void
//  */
// const updateQueryParam = (param: string) => {
//   // update url w/o page reload
//   if (!param) return;
//   if (window.history && window.history.pushState) {
//     const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category=' + encodeURI(param);
//     window.history.pushState({ path: newurl }, '', newurl);
//   } else {
//     alert('Please update your browser version');
//   }
// }

// const ProjectCard = ({
//   data, setCard, selectedCard, isMobile
// }: {
//   data: Card, setCard: Function, selectedCard: Card, isMobile: boolean
// }) =>{
//   const { categoryName, imageURL } = MapCardToJSON(data);
//   const selectedName = selectedCard['CategoryName'] ? selectedCard['CategoryName'][0] : '';

//   const selectCard = () => {
//     updateQueryParam(categoryName)
//     setCard({selectedCard: data, visible: true})
//   };
  
//   const highlight = classNames({
//     "card-selected": !!selectedName && selectedName === categoryName
//   });

//   let sizing;
//   if (!!selectedName) {
//     sizing = 'p-col-12';
//   } else if (isMobile) { // show all, mobile
//     sizing = 'p-col-4';
//   } else { // show all, not mobile
//     sizing = 'p-col-2';
//   }
  
//   return (
//     <div key={categoryName} className={sizing}>
//       <TileCard displayName={categoryName} imageURL={imageURL} actions={[{fn: selectCard}]} className={highlight}/>
//     </div>
//   );
// }
// export default ProjectCard;