import { Center, Image, useTheme } from "native-base";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import UserIcon from "../../../../Reusables/UserIcon/UserIcon";
import { useSidePanel } from "../../../../../utils/contexts/sidePanelOpenedContext";
import { useNavigation } from "../../../../../utils/contexts/navigationContext";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

function ProfilePhoto() {
    const { profilePhoto } = useSelector((state) => state.account);
    const { NavigationRef } = useNavigation();
    const { colors } = useTheme();
    const { setSidePanelOpened } = useSidePanel();

    const navigateToSettings = useCallback(() => {
        NavigationRef.navigate("settings");
        setSidePanelOpened(false);
    }, []);

    return (
        <Center size={120}>
            <AnimatedPressable onPress={navigateToSettings} style={styles.pressable}>
                <Center w="full" h="full">
                    <Svg style={styles.centerSvg} viewBox="0 0 100 100">
                        <Circle cx="50" cy="50" r="49" stroke="#ffffff50" strokeWidth={2} />
                        <Circle
                            cx="50"
                            cy="50"
                            r="49"
                            stroke={colors.primary[100]}
                            strokeDasharray={307.3787841796875}
                            strokeDashoffset={250}
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                    </Svg>
                    {profilePhoto ? (
                        <Image
                            rounded="full"
                            source={{
                                uri: `data:image/*;base64,${profilePhoto}`,
                            }}
                            w={110}
                            h={110}
                            resizeMode="cover"
                            alt="profile"
                        />
                    ) : (
                        <UserIcon size={60} notClickable />
                    )}
                </Center>
            </AnimatedPressable>
        </Center>
    );
}

export default ProfilePhoto;

const styles = StyleSheet.create({
    pressable: { width: 120, height: 120 },
    centerSvg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        transform: [{ rotate: "30deg" }],
    },
});
