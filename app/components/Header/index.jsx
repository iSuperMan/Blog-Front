// @flow
import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import Title from './components/Title';
import Menu from './components/Menu';
import type { User } from '../../services/entities/user';

type HeaderProps = {
	user: User | null,
	shadow: boolean,
  signOutClickHanlder: () => void,
  signInClickHandler: () => void,
	history: {
		/* eslint-disable react/no-unused-prop-types */
		push: (string) => void,
		/* eslint-enable  react/no-unused-prop-types */
	}
};

const Header = (props: HeaderProps) => <AppBar
  title={<Title user={props.user} />}
  style={{ backgroundColor: 'white' }}
	zDepth={props.shadow ? 1 : 0}

  iconElementRight={
    props.user

		? <Menu
			items={[
				{ text: 'New Story', onClick: () => props.history.push('/new-story') },
				{ text: 'Stories', onClick: () => props.history.push('/me/stories') },
				{ text: 'Profile', onClick: () => props.history.push(`/@${props.user.username}`) },
				{ text: 'Sign Out', onClick: () => props.signOutClickHanlder() },
			]}
		/>

		: <RaisedButton
      primary
      onTouchTap={props.signInClickHandler}
      style={{ marginTop: 7 }}
      label="Sign Up / Sign In"
		/>
  }
/>;

export default withRouter(Header);
