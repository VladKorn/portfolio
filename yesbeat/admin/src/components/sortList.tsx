import React from "react";
// { useState, useEffect } 
export default function SortList(props: SortListProps) {
    // console.log('props.items' , props.items);
	let activeIndex = 0;
	if (props.currentSortIndex) {
		activeIndex = props.currentSortIndex;
    }

	// useEffect(() => {
		// setTranslateY(Y);
		// console.log('useEffect' ,lengthToCurrentItem , translateY);
	// });

	// setTranslateY(123);
	const SortList = (props: SortList) => {
		// let pagination = [];
		// for (let i = 0; i < params.totalPages; i++) {
		// 	pagination.push(
		// 		<li
		//             onClick={()=>{params.settCurrentPage(i+1)}}
		// 			key={i}
		//
		// 		>
		// 			{i + 1}
		// 		</li>
		// 	);
		// }
		// return pagination;
	};
	// if (props.items === null) return;
	// if (props.items === undefined) return;
	return (
		<div className="sort-list">
			<ul>
				{props.items !== null ? props.items.map((item: SortListItem, index: number) => {
					return (
						<li
                            onClick={()=>{props.setCurrentSortIndex(index)}}
                            key={index}
							className={activeIndex === index ? "is-active" : ""}
							title={item.name}
						>
							{item.name}
						</li>
					);
				}): null}

			</ul>
		</div>
	);
}
