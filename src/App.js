import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import MerchantList from "./components/merchants/MerchantList";
import CreateMerchant from "./components/merchants/CreateMerchant";
import EditMerchant from "./components/merchants/EditMerchant";
import MerchantDetail from "./components/merchants/MerchantDetail";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/add-merchant" component={CreateMerchant}>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/update-merchant/:id" component={EditMerchant}>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/merchant/:id" component={MerchantDetail}>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/" component={MerchantList}></Route>
        </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
