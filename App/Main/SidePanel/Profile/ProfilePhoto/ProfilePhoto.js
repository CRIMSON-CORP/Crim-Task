import { Center, Image, Box } from "native-base";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDE } from "../../../../../redux/ui/components/ui.actions";
import { NavigationContext } from "../../../../../utils/context";
import UserIcon from "../../../../Reusables/UserIcon/UserIcon";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
const ProfilePhoto = () => {
    const profile = useSelector((state) => state.account.profilePhoto);
    const { NavigationRef } = useContext(NavigationContext);
    const dispatch = useDispatch();
    return (
        <Center size={115}>
            <AnimatedPressable
                onPress={() => {
                    NavigationRef.navigate("settings");
                    dispatch({ type: CLOSE_SIDE });
                }}
                style={{
                    width: 108,
                    height: 108,
                }}
            >
                <Center w="full" h="full">
                    <Box
                        w="full"
                        h="full"
                        borderColor={"#ffffff50"}
                        position="absolute"
                        rounded="full"
                        borderWidth={2}
                    />
                    {profile ? (
                        <Image
                            rounded="full"
                            source={{
                                uri: `data:image/*;base64,${profile.uri}`,
                            }}
                            w={108}
                            h={108}
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
