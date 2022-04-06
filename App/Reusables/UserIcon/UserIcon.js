import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
const UserIcon = ({ size, style, onPress, notClickable }) => {
    return (
        <Svg
            width={size}
            height={size * 0.935897}
            viewBox="0 0 78 73"
            fill="none"
            style={style}
            pointerEvents={`${notClickable ? "none" : "auto"}`}
            onPress={() => onPress && onPress()}
        >
            <Path
                d="M39 50.25C52.531 50.25 63.5 39.281 63.5 25.75C63.5 12.219 52.531 1.25 39 1.25C25.469 1.25 14.5 12.219 14.5 25.75C14.5 39.281 25.469 50.25 39 50.25Z"
                stroke="white"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
            <Path
                d="M1.86719 71.6875C5.62999 65.1687 11.0426 59.7554 17.5608 55.9917C24.079 52.228 31.4732 50.2466 39 50.2466C46.5268 50.2466 53.921 52.228 60.4392 55.9917C66.9574 59.7554 72.37 65.1687 76.1328 71.6875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

UserIcon.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func,
    notClickable: PropTypes.bool,
};

export default UserIcon;
