import React ,{useState , useEffect}from "react";


export default function Pagination(params: Pagination) {
    const cellSize = 40;
    const center = (window.innerHeight / 2)-cellSize;
    const lengthToCurrentItem = cellSize * params.currentPage;
    const Y = lengthToCurrentItem - center;
    const [translateY, setTranslateY] = useState(Y);
    useEffect(() => {
        setTranslateY(Y);
		// console.log('useEffect' ,lengthToCurrentItem , translateY);
      },[Y]);

    // setTranslateY(123);
	const renderPagination = (params: Pagination) => {
    
		let pagination = [];
		for (let i = 0; i < params.totalPages; i++) {
			pagination.push(
				<li
                    onClick={()=>{params.settCurrentPage(i+1)}}
					key={i}
					className={params.currentPage === i+1 ? "is-active" : ""}
				>
					{i + 1}
				</li>
			);
		}
		return pagination;
	};
	return (
		<div className="pagination">
            <ul style={{transform:`translateY(${translateY >0 ?'-':''}${Math.abs(translateY)}px)`}}>
            {renderPagination(params)}</ul>
		</div>
	);
}
