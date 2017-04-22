// @flow
import React from 'react';
import NavigationLink from '../NavigationLink';

type NavigationBarProps = {
  basePath: string,
}

const NavigationBar = (props: NavigationBarProps) => <div style={{ paddingLeft: 16 }}>
  <NavigationLink
    to={`${props.basePath}/drafts`}
    label="Drafts"
  />

  <NavigationLink
    to={`${props.basePath}/public`}
    label="Public"
  />
</div>;

export default NavigationBar;
