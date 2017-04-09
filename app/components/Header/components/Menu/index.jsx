// @flow
import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

type MenuProps = {
  items: Array<{text: string, onClick?: () => void}>,
};

export default ({ items }: MenuProps) => <IconMenu
  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
>
  {/* eslint-disable react/no-array-index-key */}
  {items.map((item, index) => <MenuItem
    key={index}
    primaryText={item.text}
    onTouchTap={item.onClick}
  />)}
  {/* eslint-enable react/no-array-index-key */}
</IconMenu>;
