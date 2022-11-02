import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Configure from '../../configure';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

function GoogleAuth() {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: Configure.appGoogleKey,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  return (
    <GoogleLogin
      clientId={Configure.appGoogleKey}
      buttonText="Sign in with Google"
      onSuccess={(res) => {
        console.log({ res });
      }}
      onFailure={(res) => {
        console.log({ res });
      }}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          block
          size="large"
          icon={<GoogleOutlined />}
        >
          Google
        </Button>
      )}
    />
  );
}

export default GoogleAuth;
