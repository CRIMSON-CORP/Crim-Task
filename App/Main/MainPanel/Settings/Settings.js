import { useContext, useState } from "react";
import {
    Box,
    Center,
    Input,
    Text,
    VStack,
    Switch,
    HStack,
    Image,
    Pressable,
    useTheme,
} from "native-base";
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
import {
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
} from "expo-image-picker";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import { AuthContext } from "../../../../utils/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserIcon from "../../../Reusables/UserIcon/UserIcon";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatePresence, View } from "moti";
const Settings = () => {
    const user = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const [userState, setUserState] = useState(user);
    const [image, setImage] = useState(user.profilePhoto);
    const { setUserExist } = useContext(AuthContext);
    const { colors } = useTheme();
    async function PickImage() {
        const permission = await getMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            await requestMediaLibraryPermissionsAsync();
            return PickImage();
        }
        const data = await launchImageLibraryAsync({
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
        <Box flex={1}>
            <SafeAreaView style={{ flex: 1, padding: 20 }}>
                <VStack space={10} flexGrow={1}>
                    <TopBar back />
                    <AnimatedText text="Settings" />
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
                                            <AnimatePresence>
                                                {image ? (
                                                    <View
                                                        key="image"
                                                        style={imageStyles}
                                                        from={animation.hide}
                                                        animate={animation.show}
                                                        exit={animation.hide}
                                                    >
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
                                                    </View>
                                                ) : (
                                                    <View
                                                        key="icon"
                                                        style={imageStyles}
                                                        from={animation.hide}
                                                        animate={animation.show}
                                                        exit={animation.hide}
                                                    >
                                                        <UserIcon
                                                            size={90}
                                                            color="white"
                                                            onPress={() => PickImage()}
                                                        />
                                                    </View>
                                                )}
                                            </AnimatePresence>
                                        </Center>
                                        <VStack space="1" alignItems={"center"}>
                                            <AnimatedPressable onPress={() => PickImage()}>
                                                <Text opacity={60}>
                                                    Tap to change Profile Photo
                                                </Text>
                                            </AnimatedPressable>
                                            <AnimatedPressable onPress={() => setImage(null)}>
                                                <Text opacity={60} color="red.400">
                                                    Remove Profile Photo
                                                </Text>
                                            </AnimatedPressable>
                                        </VStack>
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
                                            selectionColor={colors.primary.accent}
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
                                            selectionColor={colors.primary.accent}
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
                                            <Box bg="red.700" w="full" p="4" py="3" rounded="10">
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
            </SafeAreaView>
        </Box>
    );
};

export default Settings;
