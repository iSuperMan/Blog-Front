// @flow
import _ from 'lodash';
import React from 'react';
import Avatar from 'material-ui/Avatar';
import type { User } from '../../../../services/entities/user';

type UserPreviewProps = {
  user: User,
};

const UserPreview = ({ user }: UserPreviewProps) => <div>
  <div style={{ width: 70, float: 'left', marginRight: 20 }}>
    <Avatar src={_.get(user, 'avatar.path')} size={70} />
  </div>

  <div style={{ lineHeight: 1.7 }}>
    <div style={{ fontSize: 15 }}>{user.fullName}</div>
    <div style={{ fontSize: 13, color: '#757575', fontWeight: 'lighter' }}>{user.bio}</div>
    <div style={{ fontSize: 13, color: '#757575', fontWeight: 'lighter' }}>Draft</div>
  </div>
</div>;

export default UserPreview;
