import { MotiPressable } from "moti/interactions";
import { useMemo } from "react";
const AnimatedPressable = ({ children, onPress }) => {
    return (
        <MotiPressable
            onPress={onPress && onPress}
            animate={useMemo(() => ({ pressed, hovered }) => {
                "worklet";
                return {
                    transform: [{ scale: hovered || pressed ? 0.8 : 1 }],
                    opacity: hovered || pressed ? 0.8 : 1,
                };
            })}
        >
            {children}
        </MotiPressable>
    );
};

export default AnimatedPressable;
