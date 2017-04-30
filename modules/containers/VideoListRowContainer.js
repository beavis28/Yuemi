import { connect } from 'react-redux';
import VideoListRow from '../components/VideoListRow.js';
import {
	addDownload,
	toggleDownloading,
	setActiveDownload,
	shiftDownloadQueue,
	addToDownloaded,
	addRequest,
} from '../actions/action.js';

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.data.id;
	const title = ownProps.data.title;
	const d = {id, title};
	return {
		activeDownload: state.activeDownload,
		downloadQueue: state.downloadQueue,
		downloaded: state.downloaded,
		requested: state.requested,

		duration: ownProps.data.duration,
		title: ownProps.data.title,
		id: ownProps.data.id,
		d,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addDownload: (obj) => {
			dispatch(addDownload(obj));
		},
		shiftDownloadQueue: () => {
			dispatch(shiftDownloadQueue());
		},
		setActiveDownload: (obj) => {
			dispatch(setActiveDownload(obj));
		},
		addToDownloaded: (obj) => {
			dispatch(addToDownloaded(obj));
		},
		addRequest: (id) => {
			dispatch(addRequest(id));
		},
	};
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(VideoListRow);
export default AppContainer;