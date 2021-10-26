import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ close }) {
	const postModal = (
		<div
			className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 text-7xl z-50'
			onClick={() => close()}
		>
			MODAL OPEN
		</div>
	);

	return ReactDOM.createPortal(postModal, document.getElementById('editpost'));
}

export default Modal;
