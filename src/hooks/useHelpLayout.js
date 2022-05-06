import DefaultHelpLayout from "../components/layouts/help";

const layouts = {
    default: DefaultHelpLayout,
};

const useHelpLayout = (props) => {
    const layoutName = props && props.layoutName ? props.layoutName : "default";
    const layout = layouts[layoutName];

    if (!layout) {
        console.log(`${layoutName}: Layout not found`);
    }

    return layout;
};

export default useHelpLayout;
