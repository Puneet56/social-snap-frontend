import React from 'react';
import ReactDOM from 'react-dom';

function EditPost({ close }) {
	console.log(close);
	const postModal = (
		<div
			className='absolute top-0 bottom-0 left-0 right-0 bg-yellow-400 text-7xl z-50'
			onClick={() => close(true)}
		>
			MODAL OPEN
		</div>
	);

	return ReactDOM.createPortal(postModal, document.getElementById('editpost'));
}

export default EditPost;
