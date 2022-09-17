import {
    getMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { AnimatePresence, View } from "moti";
import { Center, Image, Pressable, Text, VStack } from "native-base";
import { memo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import UserIcon from "../../../../Reusables/UserIcon/UserIcon";
import { changeProfilePhoto } from "../../../../../redux/account/account.reducer";
const ProfilePhotoSettings = () => {
    const { profilePhoto } = useSelector((state) => state.account);

    const [image, setImage] = useState(profilePhoto);

    const dispatch = useDispatch();

    const PickImage = useCallback(async () => {
        const permission = await getMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            await requestMediaLibraryPermissionsAsync();
            return PickImage();
        }
        const data = await launchImageLibraryAsync({
            base64: true,
        });
        if (!data.cancelled) {
            setImage(data.base64);
            dispatch(changeProfilePhoto(data.base64));
        }
    }, [image]);

    const removeProfilePic = useCallback(() => {
        setImage(null);
        dispatch(changeProfilePhoto(null));
    }, [image]);

    useEffect(() => {
        setImage(null);
    }, []);

    const imageStyles = {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    };
    const animation = {
        show: {
            opacity: 1,
            scale: 1,
        },
        hide: {
            opacity: 0,
            scale: 0.5,
        },
    };
    return (
        <VStack alignItems={"center"} space={4}>
            <Center size={200} rounded="full" bg={"#ffffff30"} overflow={"hidden"}>
                <AnimatePresence>
                    {image ? (
                        <View
                            key="image"
                            style={imageStyles}
                            from={animation.hide}
                            animate={animation.show}
                            exit={animation.hide}
                        >
                            <Pressable onPress={PickImage} w="full" h="full">
                                <Image
                                    source={{
                                        uri: `data:image/*;base64,${image}`,
                                    }}
                                    alt="prfile photo"
                                    w="full"
                                    h="full"
                                    resizeMode="cover"
                                    onError={() => {
                                        setImage(null);
                                    }}
                                />
                            </Pressable>
                        </View>
                    ) : (
                        <View
                            key="icon"
                            style={imageStyles}
                            from={animation.hide}
                            animate={animation.show}
                            exit={animation.hide}
                        >
                            <UserIcon size={90} color="white" onPress={PickImage} />
                        </View>
                    )}
                </AnimatePresence>
            </Center>
            <VStack space="1" alignItems={"center"}>
                <AnimatedPressable onPress={PickImage}>
                    <Text opacity={60}>Tap to change Profile Photo</Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={removeProfilePic}>
                    <Text opacity={60} color="red.400">
                        Remove Profile Photo
                    </Text>
                </AnimatedPressable>
            </VStack>
        </VStack>
    );
};

export default memo(ProfilePhotoSettings);
