// @flow
import React from 'react';
import IconButton from 'material-ui/IconButton';
import NoLikeIcon from 'material-ui/svg-icons/action/favorite-border';
import LikeIcon from 'material-ui/svg-icons/action/favorite';
import { cyan500 } from 'material-ui/styles/colors';

type LikeButtonTypes = {
  isLiked: boolean,
  onClick: () => void,
  value: number,
}

const LikeButton = (props: LikeButtonTypes) => <div
  style={{ color: cyan500 }}
>
  <IconButton
    onTouchTap={props.onClick}
  >
    {props.isLiked ? <LikeIcon color={cyan500} /> : <NoLikeIcon color={cyan500} />}
  </IconButton>

  <span style={{ position: 'relative', bottom: 5 }}>{props.value}</span>
</div>;

export default LikeButton;
