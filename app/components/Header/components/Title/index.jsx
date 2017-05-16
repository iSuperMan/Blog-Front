// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from 'material-ui/svg-icons/social/person';
import type { User } from '../../../../services/entities/user';
import styles from './assets/styles.css';

type TitleProps = {
	user: ?User,
};

const Title = (props: TitleProps) => <div className={styles.title}>
  <Link to="/">
		<x-title>Blog</x-title>
	</Link>

	{props.user && <x-user-info>
		<x-user-icon>
			<PersonIcon />
		</x-user-icon>

		<x-user-name>
			{props.user.fullName}
		</x-user-name>
  </x-user-info>}
</div>;

export default Title;
