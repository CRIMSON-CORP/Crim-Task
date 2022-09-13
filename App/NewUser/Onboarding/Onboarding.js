import React from "react";
import PropTypes from "prop-types";
import { Entypo } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, Center, FlatList, Heading, HStack, Image, Text, VStack } from "native-base";
import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import AnimatedPressable from "../../Reusables/AnimatedPressable";
import { Art1, Art2, Art3, Art4 } from "./Arts";

const { width, height } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedCenter = Animated.createAnimatedComponent(Center);
const bgs = ["#372773", "#602EA6", "#DB00FF", "#E91E63"];
const DATA = [
    {
        index: 0,
        heading: "Note them.",
        desc: "Note tasks down as soon as you discover them, and add them to the your list in just three easy ways!",
        art: Art1,
    },
    {
        index: 1,
        heading: "Work on them.",
        desc: "Work on them in your spare time, so your time can be better utilized productively.",
        art: Art2,
    },
    {
        index: 2,
        heading: "Complete them.",
        desc: "Make sure to complete your noted tasks and then feel the satisfaction of accomplishment and having a prouductive life!",
        art: Art3,
    },
    {
        index: 3,
        heading: "Enjoy!",
        desc: "Have a fulfilled life, spending and enjoying time with your loved ones knowing you have nothing to worry about!",
        art: Art4,
    },
];
const buttonAnimation = {
    from: { opacity: 0, transform: [{ translateY: 50 }] },
    exit: {
        opacity: 0,
        transform: [{ translateY: -50 }],
    },
    animate: {
        opacity: 1,
        transform: [{ translateY: 0 }],
    },
};

function Onboarding({ navigation }) {
    const progress = useSharedValue(0);
    const [scrollEnd, setScrollEnd] = useState(false);
    return (
        <Box flex={1}>
            <Background progress={progress} />
            <Square progress={progress} />
            <FlatList
                onScroll={(e) => {
                    let offset = e.nativeEvent.contentOffset.x;
                    progress.value = offset;
                    if (offset >= width * (DATA.length - 1) - 200) setScrollEnd(true);
                    else setScrollEnd(false);
                }}
                data={DATA}
                horizontal
                keyExtractor={(item) => item.index}
                pagingEnabled
                bounces={false}
                decelerationRate={"normal"}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Box w={width} h={height} px="6">
                        <VStack flex={1}>
                            <Center flex={0.6} position="relative">
                                <BlobBackground />
                                <Image
                                    source={item.art}
                                    w={width * 0.7}
                                    alt="Art"
                                    resizeMode="contain"
                                />
                            </Center>
                            <VStack flex={0.4} spacing={"6"}>
                                <Heading>{item.heading}</Heading>
                                <Text>{item.desc}</Text>
                            </VStack>
                        </VStack>
                    </Box>
                )}
            />
            <Indicators progress={progress} />
            <AnimatedPressable
                style={{
                    alignSelf: "flex-end",
                    width: 200,
                    height: 50,
                    justifyContent: "center",
                }}
                onPress={() => navigation.navigate("createAcc")}
            >
                <HStack alignItems={"center"} m="5" space="3">
                    <AnimatePresence initial={false}>
                        {scrollEnd ? (
                            <MotiView
                                key="create"
                                {...buttonAnimation}
                                style={[customStyles.absolute, { right: 20 }]}
                            >
                                <Text fontFamily={"Gisha"} fontSize={24}>
                                    Create Profile
                                </Text>
                            </MotiView>
                        ) : (
                            <MotiView
                                key="skip"
                                {...buttonAnimation}
                                style={[customStyles.absolute, { right: 20 }]}
                            >
                                <Text fontFamily={"Gisha"} fontSize={24}>
                                    Skip
                                </Text>
                            </MotiView>
                        )}
                    </AnimatePresence>
                    <Entypo
                        name="chevron-thin-right"
                        color={"white"}
                        size={20}
                        style={[customStyles.absolute, { right: 0 }]}
                    />
                </HStack>
            </AnimatedPressable>
        </Box>
    );
}

Onboarding.propTypes = {
    navigation: PropTypes.object,
};

function Background({ progress }) {
    const input = [...DATA.map((_, i) => i * width)];
    const AnimatedBackgroundStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, input, bgs, "RGB"),
    }));
    return <AnimatedBox style={[AnimatedBackgroundStyles, StyleSheet.absoluteFill]} />;
}

Background.propTypes = {
    progress: PropTypes.shape({
        value: PropTypes.number,
    }).isRequired,
};

function BlobBackground() {
    return (
        <Svg
            width={291}
            height={304}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={customStyles.absolute}
        >
            <Path
                d="M244.305 40.65c19.524 16.306 34.76 51.417 42.153 75.576 6.913 22.594 2.954 37.501-.429 60.784-3.393 23.36-11.941 48.261-25.294 67.731-14.23 20.747-32.039 38.628-54.977 49.303-23.492 10.933-51.033 11.015-76.545 5.601-24.813-5.266-45.738-20.16-65.69-35.788-20.09-15.735-39.889-32.464-50.744-55.413C1.567 184.739-.43 158.279 1.275 132.259c1.809-27.614 5.62-56.046 21.644-78.6C39.345 30.542 63.557 11.465 91.482 5.296c26.904-5.943 61.078-6.9 88.021-.667 24.917 5.765 45.195 19.648 64.802 36.022z"
                fill="#fff"
            />
        </Svg>
    );
}

function Indicators({ progress }) {
    return (
        <HStack justifyContent={"center"} space="2" my="10">
            {DATA.map((_, i) => (
                <IndicatorCenter progress={progress} index={i} key={i} />
            ))}
        </HStack>
    );
}

Indicators.propTypes = {
    progress: PropTypes.shape({
        value: PropTypes.number,
    }).isRequired,
};

function IndicatorCenter({ progress, index }) {
    const AnimatedCenterStyles = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    progress.value,
                    [(index - 1) * width, index * width, (index + 1) * width],
                    [0.7, 1.1, 0.7],
                    Extrapolate.CLAMP
                ),
            },
        ],
    }));
    return <AnimatedCenter style={AnimatedCenterStyles} size={"2.5"} bg="white" rounded="full" />;
}

IndicatorCenter.propTypes = {
    progress: PropTypes.shape({
        value: PropTypes.number,
    }),
    index: PropTypes.number,
};

function Square({ progress }) {
    const inputRange = [0, 0.5, 1];
    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${interpolate(
                    ((progress.value % width) / width) % 1,
                    inputRange,
                    [-64, 0, -64]
                )}deg`,
            },
        ],
        top: interpolate(((progress.value % width) / width) % 1, inputRange, [
            -(height * 1.15),
            -(height * 1.5),
            -(height * 1.15),
        ]),
        left: interpolate(((progress.value % width) / width) % 1, inputRange, [
            -(width * 1.8),
            -(width * 2),
            -(width * 1.8),
        ]),
    }));
    return (
        <AnimatedBox
            style={AnimatedBoxStyles}
            position={"absolute"}
            w={height * 1.5}
            h={height * 1.5}
            bg="white"
            left={-(height * 0.1)}
            rounded={100}
        />
    );
}

Square.propTypes = {
    progress: PropTypes.shape({
        value: PropTypes.number,
    }),
};

const customStyles = StyleSheet.create({
    absolute: {
        position: "absolute",
    },
});
export default Onboarding;
