import React from "react";

interface Props {
	isOpen: boolean;
    setPopupIsOpen: (x: boolean) => void;
    content: any;
}

const Popup: React.FC<Props> = props => {
	return (
		<section id="popup" className={props.isOpen ? 'isOpen': ''} onClick={(event) => {
            event.preventDefault();
            if(event.target === event.currentTarget) {
                console.log('setPopupIsOpen' , event)
                props.setPopupIsOpen(false);
            }
        }}>
			<div className="content"> 
            {props.content}
            </div>
		</section>
	);
};

export default Popup;
