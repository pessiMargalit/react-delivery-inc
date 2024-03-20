import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerPage from './pages/customerPage';
import PackagePage from './pages/packagePage';
import InvoicePage from './pages/invoicePage';
import HomePage from './pages/homePage';
import UseDataFetching from './hooks/useDataFetching'
import NavBar from './pages/navbarPage';

const App = () => {
  const customers = ["..."];
  const packages = ["..."];
  const invoices = ["..."];

  return (
    <Router>
      <NavBar />
      <Switch>
      <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/customers">
          <CustomerPage />
        </Route>
        <Route exact path="/packages">
          <PackagePage />
        </Route>
        <Route exact path="/invoices">
          <InvoicePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
