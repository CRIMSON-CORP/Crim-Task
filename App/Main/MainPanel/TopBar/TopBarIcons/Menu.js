import { Svg, Path } from "react-native-svg";
import React from "react";

const Menu = (size = 45, color = "#fff") => {
    return (
        <Svg width={size} height={size / 1.76} viewBox={`0 0 ${size} ${size / 1.76}`} fill="none">
            <Path
                d="M2 2H42M2 23H25.908"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Menu;
