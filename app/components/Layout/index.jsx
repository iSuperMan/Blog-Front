import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './assets/styles.scss';

const Layout = ({ children }) => <MuiThemeProvider>{children}</MuiThemeProvider>;

Layout.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Layout;
