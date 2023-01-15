import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Configure from '../../configure';
import { Button, message } from 'antd';
import { loginWithAssertion } from '../../../utility/WithApolloProvider';
import { useAuth } from '../../../context/AuthContext';
import google from '../../../assets/images/fi-rs-google.svg';

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
      isSignedIn={false}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          block
          size="large"
          icon={<img src={google} className="absolute left-[22px] top-[9px]" />}
          className="h-[44px] text-[#111111] hover:text-[#111111] border-[#D4D8D8] hover:border-[#D4D8D8]"
          loading={loading}
        >
          Google
        </Button>
      )}
    />
  );
}

export default GoogleAuth;
