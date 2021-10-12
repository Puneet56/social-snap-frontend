import React from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';

function Loader() {
	const loader = (
		<div className='absolute top-0 bottom-0 left-0 right-0'>
			<LoadingOverlay
				active
				spinner
				text='Loading your content...'
			></LoadingOverlay>
		</div>
	);

	return ReactDOM.createPortal(loader, document.getElementById('loader'));
}

export default Loader;
