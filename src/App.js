import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ApiProvider } from "./components/_context";

import ListComponent from "./pages/list";
import DetailComponent from "./pages/details";

const App = () => {
  return (
    <ApiProvider>
      <header></header>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ListComponent} />
            <Route path="/:num" component={DetailComponent} />
          </Switch>
      </BrowserRouter>
    </ApiProvider>
  );
};

export default App;
