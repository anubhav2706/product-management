import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";

import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";

import LoginRoute from "./components/LoginRoute";
import SignUpRoute from "./components/SignUpRoute";

import ProtectedRoute from "./components/ProtectedRoute";

import ProductStore from "./stores/product.store";
import ProductAddScreen from "./screens/ProductAddScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import SignUpScreen from "./screens/SignUpScreen";

const App = () => {
  return (
    <Provider productStore={new ProductStore()}>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/">
            <Dashboard />
          </ProtectedRoute>
          <SignUpRoute  path="/signup">
            <SignUpScreen />
          </SignUpRoute>
          <LoginRoute exact path="/login">
            <LoginScreen />
          </LoginRoute>

          <ProtectedRoute exact path="/products/:id/edit">
            <ProductEditScreen />
          </ProtectedRoute>
          <ProtectedRoute exact path="/products">
            <ProductScreen />
          </ProtectedRoute>
          <ProtectedRoute exact path="/products/add">
            <ProductAddScreen />
          </ProtectedRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
