import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { CategoryLibrary } from './components/category-library/category-library.component';
import { ProjectLibrary } from './components/project-library/project-library.component';

function App() {
  return (
    <Switch>
      <Route path='/category-library' component={CategoryLibrary}/>
      <Route path='/project-library' component={ProjectLibrary}/>
    </Switch>
  );
}

export default App;
