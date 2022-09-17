import PropTypes from "prop-types";
import {
    getMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
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
import { useState, useEffect, useCallback } from "react";
import { Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDispatch } from "react-redux";
import AnimatedPressable from "../../Reusables/AnimatedPressable";
import BlobBackground from "../../Reusables/BlobBackground/BlobBackground";
import BackArrow from "../../Reusables/TopBar/TopBarIcons/BackArrow";
import UserIcon from "../../Reusables/UserIcon/UserIcon";
import {
    changeFirstName,
    changeLastName,
    changeProfilePhoto,
    changeRoundedCorners,
    updateUserExistence,
} from "../../../redux/account/account.reducer";

const { height } = Dimensions.get("screen");

function CreateAccount({ navigation }) {
    const [image, setImage] = useState(null);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const dispatch = useDispatch();
    const { colors } = useTheme();

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
        }
    }, [image]);

    const createUser = useCallback(() => {
        if (fname && lname) {
            dispatch(changeProfilePhoto(image));
            dispatch(changeRoundedCorners(true));
            dispatch(changeFirstName(fname.trim()));
            dispatch(changeLastName(lname.trim()));
            dispatch(updateUserExistence(true));
        } else Alert.alert("Empty Field", "Firstname and Lastname should be filled! ");
    }, [image, fname, lname]);

    const onchangeFirstname = useCallback((e) => {
        setFname(e);
    }, []);

    const onchangeLastname = useCallback((e) => {
        setLname(e);
    }, []);

    useEffect(() => {
        return () => {
            setImage(null);
            setFname("");
            setLname("");
        };
    }, []);

    return (
        <Box flex={1}>
            <BlobBackground full />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="always"
                >
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
                                            <Pressable onPress={PickImage} w={200} h={200}>
                                                <Image
                                                    source={{
                                                        uri: `data:image/*;base64,${image}`,
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
                                            <UserIcon size={height * 0.1} onPress={PickImage} />
                                        )}
                                    </Center>
                                    <Text opacity={60} onPress={PickImage} fontWeight={300}>
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
                                            onChangeText={onchangeFirstname}
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
                                            onChangeText={onchangeLastname}
                                        />
                                    </VStack>
                                </Box>
                            </VStack>
                            <AnimatedPressable onPress={createUser}>
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
}

CreateAccount.propTypes = {
    navigation: PropTypes.object,
};

export default CreateAccount;
