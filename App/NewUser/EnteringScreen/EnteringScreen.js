import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Text, VStack } from "native-base";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedPressable from "../../Reusables/AnimatedPressable";
import BlobBackground from "../../Reusables/BlobBackground/BlobBackground";

const AnimatedBox = Animated.createAnimatedComponent(Box);

function EnteringScreen({ navigation }) {
    return (
        <Box flex={1}>
            <BlobBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <VStack justifyContent={"space-between"} p="6" pt="3" flex={1}>
                    <AnimatedBox entering={FadeIn.delay(500)}>
                        <Text fontFamily="GishaBold" fontSize={24}>
                            Crim-Task
                        </Text>
                    </AnimatedBox>
                    <VStack space="5">
                        <Box>
                            <AnimatedBox entering={FadeInDown.duration(600).delay(1000)}>
                                <Heading fontFamily={"GishaBold"}>Welcome to Crim-Task!</Heading>
                            </AnimatedBox>
                            <AnimatedBox entering={FadeInDown.duration(600).delay(1250)}>
                                <Text>Become way more organized and accomplish more tasks.</Text>
                            </AnimatedBox>
                        </Box>
                        <AnimatedBox entering={FadeInDown.duration(600).delay(1500)}>
                            <AnimatedPressable onPress={() => navigation.navigate("onboarding")}>
                                <Box w="full" p="4" bg="white" rounded="10">
                                    <Text textAlign="center" color="primary.200" fontWeight={"700"}>
                                        Get Started!
                                    </Text>
                                </Box>
                            </AnimatedPressable>
                        </AnimatedBox>
                    </VStack>
                </VStack>
            </SafeAreaView>
        </Box>
    );
}

EnteringScreen.propTypes = {
    navigation: PropTypes.object,
};

export default EnteringScreen;
