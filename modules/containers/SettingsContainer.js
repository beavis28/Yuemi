import { connect } from 'react-redux';
import { restoreDefaultSettings } from '../actions/action.js';
import { purgeDownloads } from '../actions/action.js';
import Settings from '../components/Settings';

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		restoreDefaultSettings: () => {
			dispatch(restoreDefaultSettings());
		},
		purgeDownloads: () => {
			dispatch(purgeDownloads());
		}
	};
};

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer;