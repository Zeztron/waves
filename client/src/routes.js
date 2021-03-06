import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from "./components/Home";
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import Shop from './components/Shop';
import ProductPage from './components/Product';

import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';
import UserCart from './components/User/Cart';

const Routes = () => {
    return (
      <Layout>
        <Switch>
          <Route
            path="/user/dashboard"
            exact
            component={Auth(UserDashboard, true)}
          />
          <Route
            path="/user/cart"
            exact
            component={Auth(UserCart, true)}
          />
          <Route
            path="/admin/add_product"
            exact
            component={Auth(AddProduct, true)}
          />
          <Route
            path="/admin/manage_categories"
            exact
            component={Auth(ManageCategories, true)}
          />
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route
            path="/register_login"
            exact
            component={Auth(RegisterLogin, false)}
          />
          <Route
            path="/product_detail/:id"
            exact
            component={Auth(ProductPage, null)}
          />
          <Route path="/register" exact component={Auth(Register, false)} />
        </Switch>
      </Layout>
    );
}

export default Routes;

