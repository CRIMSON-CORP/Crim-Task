import { View } from "moti";

const ScreenAnimatePrescence = ({ children }) => {
    return (
        <View
            from={{
                translateY: 10,
                opacity: 0.5,
            }}
            animate={{
                translateY: 0,
                opacity: 1,
            }}
            transition={{
                type: "timing",
            }}
            exit={{
                translateY: -10,
                opacity: 0,
            }}
        >
            {children}
        </View>
    );
};

export default ScreenAnimatePrescence;
