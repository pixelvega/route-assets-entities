import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Assets from './components/assets';
import Entity from './components/Entities';

function App() {

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
