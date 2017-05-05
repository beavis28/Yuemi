import { connect } from 'react-redux';
import {
	updateText,
	toggleSearching,
	updateSearchList,
	downloading,
	updateFeed,
} from '../actions/action.js';

import Feed from '../components/Feed';

const mapStateToProps = (state) => {
	return {
		feedList: state.feed.feedList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFeed: (feedList) => {
			dispatch(updateFeed(feedList));
		},
	};
};

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);
export default FeedContainer;