// @flow
import React from 'react';
import PersonIcon from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './assets/styles.css';
import UserStatistic from '../UserStatistic';
import type { User } from '../../../../services/entities/user';

type UserPreviewProps = {
  user: User,
	me: User | null,
	onEditButtonClick: () => void,
};

const UserPreview = ({
  user,
  me,
	onEditButtonClick,
}: UserPreviewProps) => <div className={styles.userPreview}>
  <div className="row">
    <div className="col-sm-9">
      <x-main-info>
        <x-title>{user.fullName}</x-title>
        <x-description>{user.bio}</x-description>
      </x-main-info>

      <UserStatistic followersAmount={29} followingAmount={938} />

      <x-user-actions>
        {
          me && me._id === user._id
            ? <FlatButton
								primary
								onTouchTap={onEditButtonClick}
                label="Edit"
                style={{ borderColor: '#00ACC1', borderWidth: 1, borderStyle: 'solid' }}
            />

            : <RaisedButton primary label="Follow" />
        }
      </x-user-actions>
    </div>

    <div className="col-sm-3">
      <x-avatar>
        <Avatar icon={<PersonIcon />} size={100} />
      </x-avatar>
    </div>
  </div>
</div>;

export default UserPreview;
