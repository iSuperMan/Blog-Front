// @flow
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import type { User } from '../../services/entities/user';

type UserPreviewProps = {
  user: User,
  bottomText: string,
};

const UserPreview = ({ user, bottomText }: UserPreviewProps) => <div>
  <div style={{ width: 70, float: 'left', marginRight: 20 }}>
    <Link to={`/@${user.username}`}>
      <Avatar src={_.get(user, 'avatar.path')} size={70} />
    </Link>
  </div>

  <div style={{ lineHeight: 1.7 }}>
    <div style={{ fontSize: 15 }}>
      <Link
        to={`/@${user.username}`}
        style={{ color: '#212121', textDecoration: 'none' }}
      >{user.fullName}</Link>
    </div>

    <div style={{ fontSize: 13, color: '#757575', fontWeight: 'lighter' }}>{user.bio}</div>
    <div style={{ fontSize: 13, color: '#757575', fontWeight: 'lighter' }}>{bottomText}</div>
  </div>
</div>;

export default UserPreview;
