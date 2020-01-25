import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './components/common/Home';
import Navbar from './components/common/Navbar';
import RecipesIndex from './components/recipes/RecipesIndex';
import RecipeShow from './components/recipes/RecipeShow';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recipes/:id" component={RecipeShow} />
          <Route path="/recipes" component={RecipesIndex} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
