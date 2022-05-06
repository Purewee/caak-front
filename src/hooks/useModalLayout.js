import DefaultModalLayout from "../components/layouts/modal/default";
import StepModalLayout from "../components/layouts/modal/stepLayout";
import ViewPostModalLayout from "../components/layouts/modal/viewPostModalLayout";
import DefaultUserProfileLayout from "../components/layouts/profile";
import ViewPostItemModalLayout from "../components/layouts/modal/viewPostItemModalLayout";
import DefaultBoostModalLayout from "../components/layouts/modal/boostModalLayout";

const layouts = {
  default: DefaultModalLayout,
  step: StepModalLayout,
  viewpost: ViewPostModalLayout,
  viewPostItem: ViewPostItemModalLayout,
  userProfile: DefaultUserProfileLayout,
  boostModal: DefaultBoostModalLayout
};

const useModalLayout = (props) => {
  const layoutName = props && props.layoutName ? props.layoutName : "default";
  const layout = layouts[layoutName];

  if (!layout) {
    console.log(`${layoutName}: Layout not found`);
  }
  return layout;
};

export default useModalLayout;
