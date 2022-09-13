import React from "react";
import PropTypes from "prop-types";
import { Svg, Path } from "react-native-svg";

function Category({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <Path
                d="M11.1467 5.31401C11.5366 4.67594 12.4634 4.67594 12.8533 5.31401L14.7872 8.47855C15.1944 9.1449 14.7148 10 13.9339 10H10.0661C9.28518 10 8.80562 9.1449 9.21283 8.47855L11.1467 5.31401Z"
                stroke={color}
                strokeWidth="2"
            />
            <Path
                d="M21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5C14 15.567 15.567 14 17.5 14C19.433 14 21 15.567 21 17.5Z"
                stroke={color}
                strokeWidth="2"
            />
            <Path
                d="M4 15.5C4 14.9477 4.44772 14.5 5 14.5H9C9.55228 14.5 10 14.9477 10 15.5V19.5C10 20.0523 9.55228 20.5 9 20.5H5C4.44772 20.5 4 20.0523 4 19.5V15.5Z"
                stroke={color}
                strokeWidth="2"
            />
        </Svg>
    );
}

Category.defaultProps = {
    size: 24,
    color: "#FFFFFF",
};

Category.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};

export default Category;
