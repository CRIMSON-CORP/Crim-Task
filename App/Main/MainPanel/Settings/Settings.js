import React, { useContext, useState } from "react";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import { Box, Center, Input, Text, VStack, Switch, HStack, Image, Pressable } from "native-base";
import TopBar from "../../../Reusables/TopBar";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import { useDispatch, useSelector } from "react-redux";
import {
    CHANGE_FIRST_NAME,
    CHANGE_LAST_NAME,
    CHANGE_PROFILE_PHOTO,
    CHANGE_ROUNDED_CORNER,
} from "../../../../redux/account/component/account.actions";
import { ClearStore, debounce } from "../../../../utils/utils";
import * as ImagePicker from "expo-image-picker";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import { AuthContext } from "../../../../utils/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserIcon from "../../../Reusables/UserIcon/UserIcon";
import { ScrollView } from "react-native-gesture-handler";
const Settings = () => {
    const user = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const [userState, setUserState] = useState(user);
    const [image, setImage] = useState(user.profilePhoto);
    const { setUserExist } = useContext(AuthContext);
    async function PickImage() {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            return PickImage();
        }
        const data = await ImagePicker.launchImageLibraryAsync({
            base64: true,
        });
        if (!data.cancelled) {
            setImage({ uri: data.base64 });
            dispatch({
                type: CHANGE_PROFILE_PHOTO,
                payload: {
                    uri: data.base64,
                },
            });
        }
    }
    return (
        <Box flex={1}>
            <ScreenPaddingWrapper>
                <VStack space={10} flexGrow={1}>
                    <TopBar back />
                    <AnimatedText text="Settings" type="Heading" />
                    <Box flex={1} pb={4}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Box>
                                <VStack space={8}>
                                    <VStack alignItems={"center"} space={4}>
                                        <Center
                                            size={200}
                                            rounded="full"
                                            bg={"#ffffff30"}
                                            overflow={"hidden"}
                                        >
                                            {image ? (
                                                <Pressable
                                                    onPress={() => PickImage()}
                                                    w="full"
                                                    h="full"
                                                >
                                                    <Image
                                                        source={{
                                                            uri: `data:image/*;base64,${image.uri}`,
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
                                            ) : (
                                                <UserIcon
                                                    size={90}
                                                    color="white"
                                                    onPress={() => PickImage()}
                                                />
                                            )}
                                        </Center>
                                        <Text opacity={60} onPress={() => PickImage()}>
                                            Tap to change Profile Photo
                                        </Text>
                                    </VStack>
                                    <VStack bg="#ffffff30" px="5" py="3" rounded="15">
                                        <Text fontSize={14} opacity={0.6} fontWeight={600}>
                                            Change First name
                                        </Text>
                                        <Input
                                            size="sm"
                                            fontSize={24}
                                            px={0}
                                            color="white"
                                            variant="unstyled"
                                            selectionColor="white"
                                            value={userState?.name?.first}
                                            onChangeText={(e) => {
                                                setUserState((prev) => ({
                                                    ...prev,
                                                    name: {
                                                        ...prev.name,
                                                        first: e.trim(),
                                                    },
                                                }));
                                                debounce(
                                                    dispatch({
                                                        type: CHANGE_FIRST_NAME,
                                                        payload: {
                                                            data: e.trim(),
                                                        },
                                                    }),
                                                    2000
                                                );
                                            }}
                                        />
                                    </VStack>
                                    <VStack bg="#ffffff30" px="5" py="3" rounded="15">
                                        <Text fontSize={14} opacity={0.6} fontWeight={600}>
                                            Change Last name
                                        </Text>
                                        <Input
                                            size="sm"
                                            fontSize={24}
                                            px={0}
                                            color="white"
                                            variant="unstyled"
                                            selectionColor="white"
                                            value={userState?.name?.last}
                                            onChangeText={(e) => {
                                                setUserState((prev) => ({
                                                    ...prev,
                                                    name: {
                                                        ...prev.name,
                                                        last: e.trim(),
                                                    },
                                                }));
                                                debounce(
                                                    dispatch({
                                                        type: CHANGE_LAST_NAME,
                                                        payload: {
                                                            data: e.trim(),
                                                        },
                                                    }),
                                                    2000
                                                );
                                            }}
                                        />
                                    </VStack>
                                    <HStack bg="#ffffff30" px="5" py="3" rounded="15" space={0}>
                                        <VStack space={2} flex={1}>
                                            <Text fontSize={18} fontWeight={600}>
                                                Disable Rounded Corners
                                            </Text>
                                            <Text
                                                fontSize={12}
                                                opacity={0.7}
                                                fontWeight={600}
                                                w="90%"
                                            >
                                                Removes the rounded corners in Main Panel Screen,
                                                best suited if your Device has Square Corners
                                            </Text>
                                        </VStack>
                                        <Switch
                                            size="lg"
                                            value={!userState.roundedPanelCorners}
                                            onValueChange={(val) => {
                                                setUserState((prev) => ({
                                                    ...prev,
                                                    roundedPanelCorners: !val,
                                                }));
                                                debounce(
                                                    dispatch({
                                                        type: CHANGE_ROUNDED_CORNER,
                                                        payload: {
                                                            state: !val,
                                                        },
                                                    }),
                                                    2000
                                                );
                                            }}
                                            onTrackColor="primary.300"
                                            onThumbColor="primary.100"
                                            offThumbColor="gray.300"
                                        />
                                    </HStack>
                                    <VStack bg="#ff000050" px="5" py="3" rounded="15" space="2.5">
                                        <Text fontSize="sm">Delete Profile</Text>
                                        <Text fontSize="xs">
                                            Deleteing your profile deletes your progress including
                                            your tasks and categories, this action is irreversible!
                                        </Text>
                                        <AnimatedPressable
                                            onPress={() => {
                                                ClearStore();
                                                AsyncStorage.removeItem("crim-task-data");
                                                setUserExist(false);
                                            }}
                                        >
                                            <Box bg="red.700" w="full" p="4" py="2" rounded="10">
                                                <Text
                                                    textAlign="center"
                                                    color="white"
                                                    fontWeight={"700"}
                                                >
                                                    Delete Profile
                                                </Text>
                                            </Box>
                                        </AnimatedPressable>
                                    </VStack>
                                </VStack>
                            </Box>
                        </ScrollView>
                    </Box>
                </VStack>
            </ScreenPaddingWrapper>
        </Box>
    );
};

export default Settings;
