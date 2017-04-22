// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationLinkProps = {
  to: string,
  label: string,
}

const NavigationLink = (props: NavigationLinkProps) => <NavLink
	style={{
		color: '#9E9E9E',
		textDecoration: 'none',
		marginRight: 15,
		fontSize: 18,
		transition: 'color .5s',
	}}

  activeStyle={{ color: '#212121' }}
  to={props.to}
>
  {props.label}
</NavLink>;

export default NavigationLink;
