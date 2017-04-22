// @flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import reducers from './reducers';
import Drafts from './containers/Drafts';
import DeleteStoryConfirmDialog from './containers/DeleteStoryConfirmDialog';
import Publications from './containers/Publications';
import NavigationBar from './components/NavigationBar';
import { selectors as authSelectors } from '../../services/auth';
import type { User } from '../../services/entities/user';

type StoriesProps = {
	user: User,
	match: {
		path: string,
	},
	history: {
		push: () => void,
	}
}

const Stories = (props: StoriesProps) => <div className="container">
	<div className="row">
		<div className="col-sm-10 offset-sm-1">
			<div className="row" style={{ marginTop: 100 }}>
				<div className="col-sm-6">
					<div style={{ fontSize: 48, fontWeight: 'bold' }}>
						Your stories
					</div>
				</div>

				<div className="col-sm-6" style={{ textAlign: 'right' }}>
					<RaisedButton
						label="Write a story"
						primary
						onClick={() => props.history.push('/new-story')}
					/>
				</div>
			</div>

			<div className="row" style={{ marginTop: 35 }}>
				<div className="col-sm-12">
					<Divider />
				</div>
			</div>

			<div className="row" style={{ marginTop: 15 }}>
				<div className="col-sm-12">
					<NavigationBar
						draftsAmount={props.user.draftsAmount}
						publicationsAmount={props.user.publicationsAmount}
						basePath={props.match.path}
					/>
				</div>
			</div>

			<div className="row" style={{ marginTop: 15 }}>
				<div className="col-sm-12">
					<Switch>
						<Route
							exact
							path={props.match.path}
							render={() => <Redirect to={`${props.match.path}/drafts`} />}
						/>

						<Route path={`${props.match.path}/drafts`} component={Drafts} />
						<Route path={`${props.match.path}/public`} component={Publications} />
					</Switch>
				</div>
			</div>

			<DeleteStoryConfirmDialog />
		</div>
	</div>
</div>;

export { reducers };
export default compose(
	connect(state => ({ user: authSelectors.getUser(state) })),
	withRouter,
)(Stories);
