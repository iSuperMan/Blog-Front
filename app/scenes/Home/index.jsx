// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import reducers from './reducers';
import Navbar from './components/Navbar';
import LatestStoriesList from './containers/LatestStoriesList';

const Home = () => <div className="container">
  <div className="row" style={{ marginTop: 35 }}>
    <div className="col-sm-7 offset-sm-1">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <LatestStoriesList />}
        />

        <Route
          path="/favorites"
          render={() => <div>Favorites</div>}
        />

      </Switch>
    </div>

    <div className="col-sm-3">
      <Navbar />
    </div>
  </div>
</div>;

export { reducers };

export default Home;
