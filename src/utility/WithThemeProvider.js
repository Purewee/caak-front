import { ConfigProvider, Empty } from 'antd';
const antdConfig = {
  renderEmpty: () => <Empty title="Мэдээлэл байхгүй байна" />,
  componentSize: 'large',
  space: { size: 16 },
  theme: {
    primaryColor: '#FF6600',
  },
};
export default function WithThemeProvider({ children }) {
  return <ConfigProvider theme={{ primaryColor: '#FF6600' }}>{children}</ConfigProvider>;
}
