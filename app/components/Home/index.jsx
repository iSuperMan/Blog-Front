// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => <div>
  <div className="container">
    <div className="col-sm-3">Home</div>
    <Link to="/profile">to profile ( only for authenticated users )</Link>
  </div>
</div>;

export default Home;
