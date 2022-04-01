import React from "react";
import { Box, Heading, Text, VStack } from "native-base";
import BlobBackground from "../Reusables/BlobBackground/BlobBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedPressable from "../Reusables/AnimatedPressable";

const EnteringScreen = ({ navigation }) => {
    return (
        <Box flex={1}>
            <BlobBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <VStack justifyContent={"space-between"} p="6" pt="3" flex={1}>
                    <Text fontFamily="GishaBold" fontSize={24}>
                        Crim-Task
                    </Text>
                    <VStack space="5">
                        <Heading fontFamily={"GishaBold"}>Welcome to Crim-Task!</Heading>
                        <Text>Become way more organized and accomplish more tasks.</Text>
                        <AnimatedPressable onPress={() => navigation.navigate("onboarding")}>
                            <Box w="full" p="4" bg="white" rounded="10">
                                <Text textAlign="center" color="primary.200" fontWeight={"700"}>
                                    Get Started!
                                </Text>
                            </Box>
                        </AnimatedPressable>
                    </VStack>
                </VStack>
            </SafeAreaView>
        </Box>
    );
};

export default EnteringScreen;
