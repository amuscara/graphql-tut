import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/new" component={NewPost} />
        <Route exact path="/edit/:id" component={EditPost} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
