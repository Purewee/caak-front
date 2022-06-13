import { ConfigProvider, Empty } from 'antd';
const antdConfig = {
  renderEmpty: () => <Empty title="Мэдээлэл байхгүй байна" />,
  componentSize: 'large',
  space: { size: 16 },
  theme: {
    primaryColor: '#FF6600',
  },
  form: {
    validateMessages: {
      // eslint-disable-next-line no-template-curly-in-string
      required: '"${label}" заавал бөглөх',
    },
  },
};
export default function WithThemeProvider({ children }) {
  return <ConfigProvider {...antdConfig}>{children}</ConfigProvider>;
}
