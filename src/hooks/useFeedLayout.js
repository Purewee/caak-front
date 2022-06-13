import DefaultFeedLayout from '../components/layouts/feed';

const layouts = {
  default: DefaultFeedLayout,
};

const useFeedLayout = (props) => {
  const layoutName = props && props.layoutName ? props.layoutName : 'default';
  const layout = layouts[layoutName];

  if (!layout) {
    console.log(`${layoutName}: Layout not found`);
  }

  return layout;
};

export default useFeedLayout;
