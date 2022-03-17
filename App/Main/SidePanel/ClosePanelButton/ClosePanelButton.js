import React from "react";
import { Svg, Path, RadialGradient, Circle, Defs, Stop } from "react-native-svg";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
const ClosePanelButton = ({ width = 50 }) => {
    return (
        <AnimatedPressable>
            <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} fill="none">
                <Circle
                    cx={width / 2}
                    cy={width / 2}
                    r={width / 2}
                    fill="url(#paint0_radial_6_43)"
                    fillOpacity={0.05}
                />
                <Circle
                    cx={width / 2}
                    cy={width / 2}
                    r={width / 2}
                    stroke="white"
                    strokeOpacity="0.1"
                />
                <Path
                    d="M28.0932 14L17 25.0932L28.0932 36.1865"
                    stroke="#B3B3B3"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Defs>
                    <RadialGradient
                        id="paint0_radial_6_43"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(25 25) rotate(90) scale(25)"
                    >
                        <Stop stopColor="#C4C4C4" stopOpacity="0.5" />
                        <Stop offset="1" stopColor="#C4C4C4" />
                    </RadialGradient>
                </Defs>
            </Svg>
        </AnimatedPressable>
    );
};

export default ClosePanelButton;
