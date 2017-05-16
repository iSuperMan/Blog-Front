// @flow
import React from 'react';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './assets/styles.css';
import UserStatistic from '../UserStatistic';
import type { User } from '../../../../../../services/entities/user';

type UserPreviewProps = {
  user: User,
	me: User | null,
	onEditButtonClick: () => void,
	openEntryDialog: () => void,
	followToUser: (userId: string) => void,
	unfollowToUser: (userId: string) => void,
};

const UserPreview = ({
  user,
  me,
	onEditButtonClick,
	openEntryDialog,
	followToUser,
	unfollowToUser,
}: UserPreviewProps) => {
	let actionButton = (<RaisedButton
    primary
    label="Follow"
    onTouchTap={() => openEntryDialog()}
	/>);

	if (me) {
		if (me._id === user._id) {
			actionButton = (<FlatButton
				primary
        onTouchTap={onEditButtonClick}
        label="Edit"
        style={{ borderColor: '#00ACC1', borderWidth: 1, borderStyle: 'solid' }}
			/>);
		} else if (user.followers.indexOf(me._id) !== -1) {
			actionButton = <RaisedButton primary label="Unfollow" onTouchTap={() => unfollowToUser(user._id)} />;
		} else {
			actionButton = <RaisedButton primary label="Follow" onTouchTap={() => followToUser(user._id)} />;
		}
	}

	return (<div className={styles.userPreview}>
    <div className="row">
      <div className="col-sm-9">
        <x-main-info>
          <x-title>{user.fullName}</x-title>
          <x-description>{user.bio}</x-description>
        </x-main-info>

        <UserStatistic
          followersAmount={user.followers.length}
          followingAmount={user.followings.length}
        />

        <x-user-actions>
          {actionButton}
        </x-user-actions>
      </div>

      <div className="col-sm-3">
        <x-avatar>
          <Avatar src={_.get(user, 'avatar.path')} size={130} />
        </x-avatar>
      </div>
    </div>
  </div>);
};

export default UserPreview;
