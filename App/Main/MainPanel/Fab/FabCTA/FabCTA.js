import { useCallback } from "react";
import { Text } from "native-base";
import { useFab } from "../../../../../utils/contexts/fabContext";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { useTheme } from "native-base";

function FabCTA({ title, onClick }) {
    const { setFabPanelOpen } = useFab();
    const { colors } = useTheme();

    const onPress = useCallback(() => {
        if (onClick) {
            onClick();
            setTimeout(() => {
                setFabPanelOpen(false);
            }, 800);
        }
    }, [onClick]);

    return (
        <View style={styles.buttonContainer}>
            <AnimatedPressable style={styles.pressable} onPress={onPress}>
                <Text
                    py="4"
                    px="30"
                    shadow={7}
                    rounded="10"
                    lineHeight={18}
                    fontWeight={"600"}
                    bg={colors.primary.accent}
                >
                    {title}
                </Text>
            </AnimatedPressable>
        </View>
    );
}

FabCTA.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "flex-start",
    },
    pressable: {
        marginTop: 20,
    },
});

export default FabCTA;
