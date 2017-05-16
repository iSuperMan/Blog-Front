// @flow
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import StarsIcon from 'material-ui/svg-icons/action/stars';
import { withRouter } from 'react-router';

const activeStyle = {
	fontWeight: 'bold',
};

const Navbar = (props: {
	location: {
		pathname: string,
	},

	history: {
		push: () => void,
	}
}) => <Paper>
  <List>
    <ListItem
      primaryText="Последние"
      leftIcon={<AssessmentIcon />}
      onTouchTap={() => props.history.push('/')}
      style={props.location.pathname === '/' ? activeStyle : {}}
    />

    <Divider />

    <ListItem
      primaryText="Популярные"
      leftIcon={<StarsIcon />}
      onTouchTap={() => props.history.push('/favorites')}
			style={props.location.pathname === '/favorites' ? activeStyle : {}}
    />
  </List>
</Paper>;

export default withRouter(Navbar);
