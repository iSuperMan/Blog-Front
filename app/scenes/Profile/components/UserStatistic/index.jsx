// @flow
import React from 'react';
import styles from './assets/styles.css';

type UserStatisticProps = {
  followersAmount: number,
  followingAmount: number,
};

const UserStatistic = (props: UserStatisticProps) => <div
  className={styles.userStatistic}
>
  <x-stat-info>
    <x-amount-group>
      <x-amount-value>{props.followingAmount}</x-amount-value>
      <x-amount-title>Following</x-amount-title>
    </x-amount-group>

    <x-amount-group>
      <x-amount-value>{props.followersAmount}</x-amount-value>
      <x-amount-title>Followers</x-amount-title>
    </x-amount-group>
  </x-stat-info>
</div>;

export default UserStatistic;
