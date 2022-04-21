import Svg, { Path } from "react-native-svg";

const BackArrow = () => {
    return (
        <Svg width="19" height="34" viewBox="0 0 19 34" fill="none">
            <Path
                d="M17 2L2 17L17 32"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default BackArrow;
