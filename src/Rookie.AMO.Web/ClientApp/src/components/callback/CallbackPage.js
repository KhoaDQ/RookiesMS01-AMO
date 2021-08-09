import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import userManager from '../../utils/userManager';

class CallbackPage extends React.Component {
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
            successCallback={(res) => {
                console.log(res);
                localStorage.setItem("jwt", res.access_token);
                this.props.dispatch(push('/'));
            }}
        errorCallback={error => {
          this.props.dispatch(push('/'));
          console.error(error);
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);
