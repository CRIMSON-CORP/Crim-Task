import React, { useState } from "react";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import {
    Box,
    Center,
    Input,
    KeyboardAvoidingView,
    Text,
    VStack,
    Switch,
    HStack,
    Image,
    ScrollView,
    Pressable,
} from "native-base";
import TopBar from "../../../Reusables/TopBar";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    CHANGE_FIRST_NAME,
    CHANGE_LAST_NAME,
    CHANGE_PROFILE_PHOTO,
    CHANGE_ROUNDED_CORNER,
} from "../../../../redux/account/component/account.actions";
import { debounce } from "../../../../utils/utils";
import * as ImagePicker from "expo-image-picker";
const Settings = () => {
    const user = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const [userState, setUserState] = useState(user);
    const [image, setImage] = useState(user.profilePhoto);
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
            <ScreenPaddingWrapper noFlex>
                <ScreenAnimatePrescence>
                    <VStack space={10}>
                        <TopBar back />
                        <AnimatedText text="Settings" type="Heading" />
                    </VStack>
                </ScreenAnimatePrescence>
            </ScreenPaddingWrapper>
            <Box flex={1} pb={4}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 40,
                        padding: 20,
                        flexGrow: 1,
                    }}
                >
                    <KeyboardAvoidingView>
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
                                            <AntDesign
                                                name="user"
                                                color="white"
                                                size={120}
                                                style={{ opacity: 0.8 }}
                                                onPress={() => PickImage()}
                                            />
                                        )}
                                    </Center>
                                    <Text opacity={60} onPress={() => PickImage()}>
                                        Change Profile Photo
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
                                        value={userState.name.first}
                                        onChangeText={(e) => {
                                            setUserState((prev) => ({
                                                ...prev,
                                                name: {
                                                    ...prev.name,
                                                    first: e,
                                                },
                                            }));
                                            debounce(
                                                dispatch({
                                                    type: CHANGE_FIRST_NAME,
                                                    payload: {
                                                        data: e,
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
                                        value={userState.name.last}
                                        onChangeText={(e) => {
                                            setUserState((prev) => ({
                                                ...prev,
                                                name: {
                                                    ...prev.name,
                                                    last: e,
                                                },
                                            }));
                                            debounce(
                                                dispatch({
                                                    type: CHANGE_LAST_NAME,
                                                    payload: {
                                                        data: e,
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
                                        <Text fontSize={12} opacity={0.7} fontWeight={600} w="90%">
                                            Removes the rounded corners in Main Panel Screen, best
                                            suited if your Device has Square Corners
                                        </Text>
                                    </VStack>
                                    <Switch
                                        size="lg"
                                        value={userState.roundedPanelCorners}
                                        onValueChange={(val) => {
                                            setUserState((prev) => ({
                                                ...prev,
                                                roundedPanelCorners: val,
                                            }));
                                            debounce(
                                                dispatch({
                                                    type: CHANGE_ROUNDED_CORNER,
                                                    payload: {
                                                        state: val,
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
                            </VStack>
                        </Box>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Box>
        </Box>
    );
};

export default Settings;
