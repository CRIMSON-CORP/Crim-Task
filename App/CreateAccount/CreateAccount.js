import React, { useContext, useState } from "react";
import {
    Box,
    Center,
    Heading,
    Image,
    Input,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    VStack,
} from "native-base";
import BlobBackground from "../Reusables/BlobBackground/BlobBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedPressable from "../Reusables/AnimatedPressable";
import BackArrow from "../Reusables/TopBar/TopBarIcons/BackArrow";
import * as ImagePicker from "expo-image-picker";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import UserIcon from "../Reusables/UserIcon/UserIcon";
import { AuthContext } from "../../utils/context";
import { useDispatch } from "react-redux";
import { SET_ACCOUNT_INITIAL_STATE } from "../../redux/account/component/account.actions";
import { Dimensions, Alert } from "react-native";
const { height } = Dimensions.get("screen");
const CreateAccount = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { setUserExist } = useContext(AuthContext);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const dispatch = useDispatch();
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
                                        Add proile picture
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
                                            variant={"unstyled"}
                                            size="lg"
                                            color="white"
                                            selectionColor="white"
                                            p="0"
                                            value={fname}
                                            onChangeText={(text) => setFname(text)}
                                        />
                                    </VStack>
                                </Box>
                                <Box
                                    px={6}
                                    py={14}
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
                                            variant={"unstyled"}
                                            size="lg"
                                            color="white"
                                            selectionColor="white"
                                            p="0"
                                            value={lname}
                                            onChangeText={(text) => setLname(text)}
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
                                                    name: {
                                                        first: fname,
                                                        last: lname,
                                                    },
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
