import { Center, Image, Box, Pressable } from "native-base";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDE } from "../../../../../redux/ui/components/ui.actions";
import { NavigationContext } from "../../../../../utils/context";
import { AntDesign } from "@expo/vector-icons";
const ProfilePhoto = () => {
    const profile = useSelector((state) => state.account.profilePhoto);
    const { NavigationRef } = useContext(NavigationContext);
    const dispatch = useDispatch();
    return (
        <Center size={115}>
            <Box
                w="full"
                h="full"
                borderColor={"#ffffff10"}
                position="absolute"
                rounded="full"
                borderWidth={2}
            />
            <Pressable
                w={108}
                h={108}
                onPress={() => {
                    NavigationRef.navigate("settings");
                    dispatch({ type: CLOSE_SIDE });
                }}
            >
                <Center w="full" h="full">
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
                        <AntDesign name="user" color="white" size={65} style={{ opacity: 0.8 }} />
                    )}
                </Center>
            </Pressable>
        </Center>
    );
};

export default ProfilePhoto;
