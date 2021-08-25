import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import LeftBar from './components/LeftBar';
import routes from './routers/router';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PopupRedirect from './components/Popup/PopupRedirect';
import { useState } from 'react';
import { useEffect } from 'react';

function App(props) {
  const { user } = useSelector((state) => state.oidc);
  const [redirect, setRedirect] = useState(false);
  const [active, setActive] = useState('/');

  useEffect(() => {
    setRedirect(user == null);
  }, [user]);

  const tranferActiveFunction = (content) => {
    setActive(content);
  };

  return (
    <Router>
      <Fragment>
        <Header componentActive={active} />
        <Container className="App container-fluid">
          <Row>
            <Col xs="6" sm="2">
              <LeftBar tranferActive={tranferActiveFunction} />
            </Col>
            <Col xs="2" sm="1"></Col>
            <Col sm="9">{showContentMenus(routes, user)}</Col>
          </Row>
        </Container>
        <PopupRedirect
          isModalOpen={redirect}
          setIsModalOpen={setRedirect}
        ></PopupRedirect>
      </Fragment>
    </Router>
  );
}

const showContentMenus = (routes, user) => {
  let result = [];
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      const allow =
        route.allowedRole.length == 0 ||
        (user != null && route.allowedRole.includes(user.profile.role));
      if (allow) {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      }
    });
  }
  return <Switch>{result}</Switch>;
};

export default App;
