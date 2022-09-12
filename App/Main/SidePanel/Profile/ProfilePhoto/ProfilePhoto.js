import React from "react";
import { Center, Image, useTheme } from "native-base";
import { useContext } from "react";
import Svg, { Circle } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
// import { CLOSE_SIDE } from "../../../../../redux/ui/components/ui.actions";
import { closeSide } from "../../../../../redux/ui/components/ui.reducer";
import { NavigationContext } from "../../../../../utils/context";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import UserIcon from "../../../../Reusables/UserIcon/UserIcon";
const ProfilePhoto = () => {
    const { profilePhoto } = useSelector((state) => state.account);
    const { NavigationRef } = useContext(NavigationContext);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    return (
        <Center size={120}>
            <AnimatedPressable
                onPress={() => {
                    NavigationRef.navigate("settings");
                    dispatch(closeSide());
                }}
                style={{
                    width: 120,
                    height: 120,
                }}
            >
                <Center w="full" h="full">
                    <Svg
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            transform: [{ rotate: "30deg" }],
                        }}
                        viewBox="0 0 100 100"
                    >
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
};

export default ProfilePhoto;
