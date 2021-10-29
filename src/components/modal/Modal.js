import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ close, children }) {
	const postModal = (
		<div
			className='absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={() => close()}
		>
			{children}
		</div>
	);

	return ReactDOM.createPortal(postModal, document.getElementById('editpost'));
}

export default Modal;
