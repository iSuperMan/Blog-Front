// @flow
import React from 'react';
import NavigationLink from '../NavigationLink';

type NavigationBarProps = {
  basePath: string,
  draftsAmount: number,
  publicationsAmount: number,
}

const NavigationBar = (props: NavigationBarProps) => <div style={{ paddingLeft: 16 }}>
  <NavigationLink
    to={`${props.basePath}/drafts`}
    label={`Drafts ${props.draftsAmount}`}
  />

  <NavigationLink
    to={`${props.basePath}/public`}
    label={`Public ${props.publicationsAmount}`}
  />
</div>;

export default NavigationBar;
