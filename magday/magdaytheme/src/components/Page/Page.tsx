import React from 'react';
import './index.css';
import SitePoints from '../SitePoints/SitePoints';
import ComplexCardContainer from '../ComplexCard/ComplexCardContainer';



const Page = (props:PageProps) => {
	return (
		<React.Fragment>
				<ComplexCardContainer 
					addToBasketHendler={props.addToBasketHendler}
					basketItems={props.basketItems}
					categories={props.categories}
					getProduct={props.getProduct}
					products={props.products}
					weekIndex={props.weekIndex}
					// onlyThisIds={props.productsOnPage}
					timeIndex={props.timeIndex}
					сatScrollingId={props.сatScrollingId}
					setCatScrollingId={props.setCatScrollingId}


				
				/>
			<section className='Page container content'  style={{backgroundImage: `url(${props.bg})`  } }>
				<h1 className='Page--title' dangerouslySetInnerHTML={{__html: props.title }} />

				<div className='content-wrap' dangerouslySetInnerHTML={{__html: props.content }} />
				<hr/>
			</section>
			<SitePoints 
				items={props.SitePointsList}
			/>
			</React.Fragment>
	)
}

export default Page




// WEBPACK FOOTER //
// ./src/components/Page/Page.jsx