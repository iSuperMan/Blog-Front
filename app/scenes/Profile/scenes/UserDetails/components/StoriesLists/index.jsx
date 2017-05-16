// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import LatestStoriesList from '../../containers/LatestStoriesList';
import RecommendsStoriesList from '../../containers/RecommendsStoriesList';
import type { User } from '../../../../../../services/entities/user';

type StoriesListsTypes = {
  basePath: string,
  user: User,
}

const StoriesLists = (props: StoriesListsTypes) => <div>
  <div className="container">
    <div className="row">
      <div className="col-sm-8 offset-sm-2" style={{ paddingTop: 40 }}>
        <Switch>
          <Route
            exact
            path={`${props.basePath}`}
            render={() => <LatestStoriesList user={props.user} />}
          />

          <Route
            path={`${props.basePath}/has-recommends`}
            render={() => <RecommendsStoriesList user={props.user} />}
          />
        </Switch>
      </div>
    </div>
  </div>
</div>;

export default StoriesLists;
