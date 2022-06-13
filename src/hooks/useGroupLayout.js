import DefaultGroupLayout from '../components/layouts/group';

const layouts = {
  default: DefaultGroupLayout,
};

const useGroupLayout = (props) => {
  const layoutName = props && props.layoutName ? props.layoutName : 'default';
  const layout = layouts[layoutName];

  if (!layout) {
    console.log(`${layoutName}: Layout not found`);
  }

  return layout;
};

export default useGroupLayout;
