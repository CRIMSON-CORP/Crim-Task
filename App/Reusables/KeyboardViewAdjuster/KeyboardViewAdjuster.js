import { useEffect, useState } from "react";
import { View as MotiView } from "moti";
import { Keyboard } from "react-native";
import { childrenPropTypes } from "../../../utils/constants";

function KeyboardViewAdjuster({ children }) {
    const [containerTransform, setContainerTransform] = useState(0);
    useEffect(() => {
        const keyboardShow = Keyboard.addListener("keyboardDidShow", (e) =>
            setContainerTransform(e.endCoordinates.height)
        );
        const keyboardHide = Keyboard.addListener("keyboardDidHide", () =>
            setContainerTransform(0)
        );
        return () => {
            keyboardShow.remove();
            keyboardHide.remove();
            setContainerTransform(0);
        };
    }, []);
    return (
        <MotiView
            style={{ width: "100%" }}
            animate={{ translateY: containerTransform }}
            transition={{ type: "timing", duration: 500 }}
        >
            {children}
        </MotiView>
    );
}

KeyboardViewAdjuster.propTypes = childrenPropTypes;

export default KeyboardViewAdjuster;
