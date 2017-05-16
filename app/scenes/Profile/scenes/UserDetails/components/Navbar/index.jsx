// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

type NavbarTypes = {
  basePath: string,
}

const styles = {
	link: {
		color: '#9E9E9E',
		textDecoration: 'none',
		padding: '15px 0',
		display: 'inline-block',
		fontSize: 17,
		marginRight: 18,
	},

	activeLink: {
		color: '#424242',
	},
};

const Navbar = (props: NavbarTypes) => <div
	style={{
		borderTop: '1px solid #EEEEEE',
	}}
>
  <NavLink
		exact
    to={`${props.basePath}`}
		style={styles.link}
		activeStyle={{ color: '#212121' }}
  >
    Latest
  </NavLink>

  <NavLink
    to={`${props.basePath}/has-recommends`}
		style={styles.link}
		activeStyle={{ color: '#212121' }}
  >
    Recommends
  </NavLink>
</div>;

export default Navbar;
