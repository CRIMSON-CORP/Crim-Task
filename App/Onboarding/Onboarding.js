import { Box, Center, FlatList, Heading, HStack, Text, VStack } from "native-base";
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Art1, Art2, Art3, Art4 } from "./Arts";
import { Dimensions, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AnimatedPressable from "../Reusables/AnimatedPressable";
import { AnimatePresence, useAnimationState, View as MotiView } from "moti";
import { useState } from "react";
const { width, height } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedCenter = Animated.createAnimatedComponent(Center);
const bgs = ["#372773", "#602EA6", "#DB00FF", "#E91E63"];
const DATA = [
    {
        index: 0,
        heading: "Note them.",
        desc: "Note tasks down as soon as you discover them, add them to the list with just a 3-step process.",
        art: <Art1 />,
    },
    {
        index: 1,
        heading: "Work on them.",
        desc: "Work on them as soon as you notice you have spare time, so you utilize your time doing productive things.",
        art: <Art2 />,
    },
    {
        index: 2,
        heading: "Complete them.",
        desc: "Make sure to complete your noted tasks and then feel they joy of accomplishing and having a pruductive life!.",
        art: <Art3 />,
    },
    {
        index: 3,
        heading: "Enjoy!",
        desc: "Spend and enjoy free time with loved ones knowing you dont have anything to worry, and have a more fulfilled life!.",
        art: <Art4 />,
    },
];
const Onboarding = ({ navigation }) => {
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
                decelerationRate={100}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Box w={width} h={height} px="6">
                        <VStack flex={1}>
                            <Center flex={0.6}>{item.art}</Center>
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
                style={{ alignSelf: "flex-end" }}
                onPress={() => navigation.navigate("createAcc")}
            >
                <HStack alignItems={"center"} m="5" space="3">
                    <AnimatePresence>
                        {scrollEnd ? (
                            <MotiView
                                key="create"
                                from={{
                                    opacity: 0,
                                    transform: [{ translateY: 50 }],
                                }}
                                exit={{
                                    opacity: 0,
                                    transform: [{ translateY: -50 }],
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: [{ translateY: 0 }],
                                }}
                                style={{ position: "absolute", right: 20 }}
                            >
                                <Text fontFamily={"Gisha"} fontSize={24}>
                                    Create Profile
                                </Text>
                            </MotiView>
                        ) : (
                            <MotiView
                                key="skip"
                                style={{ position: "absolute", right: 20 }}
                                from={{
                                    opacity: 0,
                                    transform: [{ translateY: 50 }],
                                }}
                                exit={{
                                    opacity: 0,
                                    transform: [{ translateY: -50 }],
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: [{ translateY: 0 }],
                                }}
                            >
                                <Text fontFamily={"Gisha"} fontSize={24}>
                                    Skip
                                </Text>
                            </MotiView>
                        )}
                    </AnimatePresence>
                    <Entypo name="chevron-thin-right" color={"white"} size={20} />
                </HStack>
            </AnimatedPressable>
        </Box>
    );
};

function Background({ progress }) {
    const input = [...DATA.map((_, i) => i * width)];
    const AnimatedBackgroundStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, input, bgs, "RGB"),
    }));
    return <AnimatedBox style={[AnimatedBackgroundStyles, StyleSheet.absoluteFill]} />;
}

function Indicators({ progress }) {
    return (
        <HStack justifyContent={"center"} space="2">
            {DATA.map((_, i) => (
                <IndicatorCenter progress={progress} index={i} key={i} />
            ))}
        </HStack>
    );
}

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
    return (
        <AnimatedPressable
            onPress={() => {
                progress.value = withTiming(index * width);
            }}
        >
            <AnimatedCenter style={AnimatedCenterStyles} size={"2.5"} bg="white" rounded="full" />
        </AnimatedPressable>
    );
}

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
export default Onboarding;
