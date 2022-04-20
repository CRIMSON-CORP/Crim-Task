import { useContext } from "react";
import { Box, Text, VStack, Switch, HStack } from "native-base";
import TopBar from "../../../Reusables/TopBar";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import { useDispatch, useSelector } from "react-redux";
import {
    CHANGE_FIRST_NAME,
    CHANGE_LAST_NAME,
    CHANGE_ROUNDED_CORNER,
} from "../../../../redux/account/component/account.actions";
import { ClearStore } from "../../../../utils/utils";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import { AuthContext, NavigationContext } from "../../../../utils/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePhotoSettings from "./ProfilePhotoSettings";
import InputBox from "./InputBox";
const Settings = () => {
    const user = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { setUserExist } = useContext(AuthContext);
    const { NavigationRef } = useContext(NavigationContext);

    return (
        <Box flex={1}>
            <SafeAreaView style={{ flex: 1, padding: 20 }}>
                <VStack space={16} flexGrow={1}>
                    <TopBar back />
                    <AnimatedText text="Settings" />
                    <Box flex={1} pb={4}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Box>
                                <VStack space={8}>
                                    <ProfilePhotoSettings />
                                    <InputBox
                                        header="Change First name"
                                        value={user?.name?.first}
                                        onChangeText={(e) => {
                                            dispatch({
                                                type: CHANGE_FIRST_NAME,
                                                payload: {
                                                    data: e.trim(),
                                                },
                                            });
                                        }}
                                    />
                                    <InputBox
                                        header="Change Last name"
                                        value={user?.name?.last}
                                        onChangeText={(e) => {
                                            dispatch({
                                                type: CHANGE_LAST_NAME,
                                                payload: {
                                                    data: e.trim(),
                                                },
                                            });
                                        }}
                                    />
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
                                            value={!user.roundedPanelCorners}
                                            onValueChange={(val) => {
                                                dispatch({
                                                    type: CHANGE_ROUNDED_CORNER,
                                                    payload: {
                                                        state: !val,
                                                    },
                                                });
                                            }}
                                            onTrackColor="primary.300"
                                            onThumbColor="primary.100"
                                            offThumbColor="gray.300"
                                        />
                                    </HStack>
                                    <VStack bg="#ffffff30" px="5" py="3" rounded="15" space="2.5">
                                        <Text fontSize="sm">How to use</Text>
                                        <Text fontSize="xs">
                                            Information on how to use the Application properly
                                        </Text>
                                        <AnimatedPressable
                                            onPress={() => {
                                                NavigationRef.navigate("how_to_use");
                                            }}
                                        >
                                            <Box bg="white" w="full" p="4" py="3" rounded="10">
                                                <Text
                                                    textAlign="center"
                                                    color="primary.200"
                                                    fontWeight={"700"}
                                                >
                                                    How to use
                                                </Text>
                                            </Box>
                                        </AnimatedPressable>
                                    </VStack>
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
