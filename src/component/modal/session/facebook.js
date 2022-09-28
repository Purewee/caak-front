import * as React from 'react';
import { Button, Form, message } from 'antd';
import { loginWithAssertion } from '../../../utility/WithApolloProvider';
import { useAuth } from '../../../context/AuthContext';
import Configure from '../../configure';
import { FacebookFilled } from '@ant-design/icons';

function initFB() {
  window.fbAsyncInit = () => {
    const { FB } = window;
    FB.init({
      appId: Configure.appFacebookId,
      autoLogAppEvents: true,
      xfbml: true,
      status: true,
      oauth: true,
      cookie: true,
      version: 'v3.1',
    });
  };
  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

function LoginWithFB() {
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();

  React.useEffect(() => {
    initFB();
  }, []);

  function onAcccessToken(accessToken) {
    loginWithAssertion(accessToken, 'facebook')
      .then((token) => {
        setLoading(false);
        if (!token) return;
        login();
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onClickFbBtn = React.useCallback(() => {
    const { FB } = window;
    if (FB) {
      setLoading(true);
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          onAcccessToken(response.authResponse.accessToken);
        } else {
          FB.login(
            (res) => {
              if (res.authResponse) {
                onAcccessToken(response.authResponse.accessToken);
              } else {
                setLoading(false);
                message.error('Хэрэглэгч фейсбүүкээр нэвтрэхээс татгалзсан');
              }
            },
            { scope: 'public_profile,email' },
          );
        }
      });
    } else {
      setLoading(false);
      message.error('Уучлаарай фейсбүүктэй холбогдож чадсангүй');
    }
  }, [setLoading]);
  return (
    <Button
      size="large"
      loading={loading}
      icon={<FacebookFilled />}
      block
      onClick={onClickFbBtn}
      className="bg-[#1876F3] mb-4 text-white border-0 hover:border"
    >
      Facebook
    </Button>
  );
}

export default LoginWithFB;
