import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, useParams } from 'react-router-dom';
import Assets from './components/assets';
import Entity from './components/entity';

function App() {
  let { id } = useParams();
  return (
    <Switch>
      <Route exact path="/">
        <Assets />
      </Route>
      <Route path="/entity/:id">
        <Entity />
      </Route>
    </Switch>
  );
}

export default App;
