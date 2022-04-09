import { useContext, useState } from "react";
import {
    Box,
    Center,
    Image,
    Input,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    useTheme,
    VStack,
} from "native-base";
import BlobBackground from "../Reusables/BlobBackground/BlobBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedPressable from "../Reusables/AnimatedPressable";
import BackArrow from "../Reusables/TopBar/TopBarIcons/BackArrow";
import {
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
} from "expo-image-picker";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import UserIcon from "../Reusables/UserIcon/UserIcon";
import { AuthContext } from "../../utils/context";
import { useDispatch } from "react-redux";
import {
    CHANGE_FIRST_NAME,
    CHANGE_LAST_NAME,
    CHANGE_PROFILE_PHOTO,
    SET_ACCOUNT_INITIAL_STATE,
} from "../../redux/account/component/account.actions";
import { Dimensions, Alert } from "react-native";
import { debounce } from "../../utils/utils";
const { height } = Dimensions.get("screen");
const CreateAccount = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { setUserExist } = useContext(AuthContext);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const dispatch = useDispatch();
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
    return (
        <Box flex={1}>
            <BlobBackground full />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <KeyboardAvoidingView flex={1}>
                        <VStack p="6" pt="3" justifyContent={"space-between"} flex={1} space="10">
                            <AnimatedPressable
                                style={{ alignSelf: "flex-start" }}
                                onPress={() => navigation.goBack()}
                            >
                                <BackArrow />
                            </AnimatedPressable>
                            <VStack space="5" flex={1}>
                                <VStack space="2.5" alignItems={"center"} alignSelf="flex-start">
                                    <Center
                                        size={height * 0.2}
                                        rounded="full"
                                        borderWidth="2"
                                        borderColor="#FFFFFF7D"
                                        bg={"#ffffff30"}
                                        overflow={"hidden"}
                                    >
                                        {image ? (
                                            <Pressable onPress={() => PickImage()} w={200} h={200}>
                                                <Image
                                                    source={{
                                                        uri: `data:image/*;base64,${image.uri}`,
                                                    }}
                                                    alt="prfile photo"
                                                    w={height * 0.2}
                                                    h={height * 0.2}
                                                    resizeMode="cover"
                                                    onError={() => {
                                                        setImage(null);
                                                    }}
                                                />
                                            </Pressable>
                                        ) : (
                                            <UserIcon
                                                size={height * 0.1}
                                                onPress={() => PickImage()}
                                            />
                                        )}
                                    </Center>
                                    <Text opacity={60} onPress={() => PickImage()} fontWeight={300}>
                                        Add profile picture
                                    </Text>
                                </VStack>

                                <Box
                                    px={6}
                                    py={3}
                                    rounded={10}
                                    bg="#602EA5A3"
                                    borderWidth={2}
                                    borderColor="#ffffff80"
                                >
                                    <VStack>
                                        <Text fontWeight={300} opacity={50}>
                                            Firstname
                                        </Text>
                                        <Input
                                            size="lg"
                                            p={0}
                                            color="white"
                                            variant="unstyled"
                                            selectionColor="white"
                                            value={fname}
                                            onChangeText={(e) => {
                                                setFname(e);
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
                                </Box>
                                <Box
                                    px={6}
                                    py={3}
                                    rounded={10}
                                    bg="#602EA5A3"
                                    borderWidth={2}
                                    borderColor="#ffffff80"
                                >
                                    <VStack>
                                        <Text fontWeight={300} opacity={50}>
                                            Lastname
                                        </Text>
                                        <Input
                                            size="lg"
                                            p={0}
                                            color="white"
                                            variant="unstyled"
                                            selectionColor={colors.primary.accent}
                                            value={lname}
                                            onChangeText={(e) => {
                                                setLname(e);
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
                                </Box>
                            </VStack>
                            <AnimatedPressable
                                onPress={() => {
                                    if (fname && lname) {
                                        setUserExist(true);
                                        dispatch({
                                            type: SET_ACCOUNT_INITIAL_STATE,
                                            payload: {
                                                data: {
                                                    profilePhoto: image,
                                                    roundedPanelCorners: true,
                                                },
                                            },
                                        });
                                    } else
                                        Alert.alert(
                                            "Empty Field",
                                            "Firstname and Lastname should be filled! "
                                        );
                                }}
                            >
                                <Box w="full" p="4" bg="white" rounded="10">
                                    <Text textAlign="center" color="primary.200" fontWeight={"700"}>
                                        Create Profile
                                    </Text>
                                </Box>
                            </AnimatedPressable>
                        </VStack>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </Box>
    );
};

export default CreateAccount;
