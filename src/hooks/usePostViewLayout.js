import DefaultViewPostLayout from "../component/layouts/viewpost";

const layouts = {
    default: DefaultViewPostLayout,
};

const useAddPostLayout = (props) => {
    const layoutName = props && props.layoutName ? props.layoutName : "default";
    const layout = layouts[layoutName];

    if (!layout) {
        console.log(`${layoutName}: Layout not found`);
    }

    return layout;
};

export default useAddPostLayout;
