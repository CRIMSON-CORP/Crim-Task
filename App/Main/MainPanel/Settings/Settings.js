import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, HStack, Switch, Text, VStack } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
    changeFirstName,
    changeLastName,
    changeRoundedCorners,
    updateUserExistence,
} from "../../../../redux/account/account.reducer";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import TopBar from "../../../Reusables/TopBar";
import InputBox from "./InputBox";
import ProfilePhotoSettings from "./ProfilePhotoSettings";
import { useNavigation } from "../../../../utils/contexts/navigationContext";
import { useCallback } from "react";

function Settings() {
    const user = useSelector((state) => state.account);
    const dispatch = useDispatch();

    const { NavigationRef } = useNavigation();

    const restUser = useCallback(async () => {
        await AsyncStorage.removeItem("crim-task-data");
        dispatch(updateUserExistence(false));
    }, []);

    const _changeRoundedCorners = useCallback((val) => {
        dispatch(changeRoundedCorners(!val));
    }, []);

    return (
        <Box flex={1}>
            <SafeAreaView style={styles.safeAreaView}>
                <VStack space={16} flexGrow={1}>
                    <TopBar back />
                    <AnimatedText delay={600} duration={550} stagger={50}>
                        Settings
                    </AnimatedText>
                    <Box flex={1} pb={4}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Box>
                                <VStack space={8}>
                                    <ProfilePhotoSettings />
                                    <InputBox
                                        header="Change First name"
                                        value={user?.name?.first}
                                        onChangeText={(e) => dispatch(changeFirstName(e.trim()))}
                                    />
                                    <InputBox
                                        header="Change Last name"
                                        value={user?.name?.last}
                                        onChangeText={(e) => dispatch(changeLastName(e.trim()))}
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
                                            onValueChange={_changeRoundedCorners}
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
                                        <AnimatedPressable onPress={restUser}>
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
}

const styles = StyleSheet.create({
    safeAreaView: { flex: 1, padding: 20 },
});

export default Settings;
