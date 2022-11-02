import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Configure from '../../configure';
import { Button, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { loginWithAssertion } from '../../../utility/WithApolloProvider';
import { useAuth } from '../../../context/AuthContext';

function GoogleAuth() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      onSuccess={(res) => {
        console.log({ res });
        loginWithAssertion(res.accessToken, 'google')
          .then((token) => {
            setLoading(false);
            if (!token) return;
            login();
          })
          .catch((e) => {
            message.error(e).then();
            setLoading(false);
          });
      }}
      onFailure={(res) => {
        console.log({ res });
      }}
      cookiePolicy="single_host_origin"
      isSignedIn={true}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          block
          size="large"
          icon={<GoogleOutlined />}
          loading={loading}
        >
          Google
        </Button>
      )}
    />
  );
}

export default GoogleAuth;
