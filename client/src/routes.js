import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';

const Routes = () => {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register_login" exact component={RegisterLogin} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Layout>
    );
}

export default Routes;

