// @flow
import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import Title from './components/Title';
import Menu from './components/Menu';
import type { User } from '../../services/entities/user';

type HeaderProps = {
	user: ?User,
  signOutClickHanlder: () => void,
  signInClickHandler: () => void,
	history: {
		push: (string) => void,
	}
};

const Header = (props: HeaderProps) => <AppBar
  title={<Title user={props.user} />}
  style={{ backgroundColor: 'white' }}

  iconElementRight={
    props.user

		? <Menu
			items={[
				{ text: 'Profile', onClick: () => props.history.push('/profile') },
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
