import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
ConfigProvider.config({
  prefixCls: 'ant',
  iconPrefixCls: 'anticon',
  theme: {
    primaryColor: '#FF6600',
  },
});
root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>,
);
