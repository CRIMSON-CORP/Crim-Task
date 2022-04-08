import { Center, Image, Box, useTheme } from "native-base";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDE } from "../../../../../redux/ui/components/ui.actions";
import { NavigationContext } from "../../../../../utils/context";
import UserIcon from "../../../../Reusables/UserIcon/UserIcon";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import Svg, { Circle } from "react-native-svg";
const ProfilePhoto = () => {
    const profile = useSelector((state) => state.account.profilePhoto);
    const { NavigationRef } = useContext(NavigationContext);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    return (
        <Center size={120}>
            <AnimatedPressable
                onPress={() => {
                    NavigationRef.navigate("settings");
                    dispatch({ type: CLOSE_SIDE });
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
                    {profile ? (
                        <Image
                            rounded="full"
                            source={{
                                uri: `data:image/*;base64,${profile.uri}`,
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
