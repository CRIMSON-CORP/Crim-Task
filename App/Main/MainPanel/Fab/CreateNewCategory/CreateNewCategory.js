import { Box, Center, Heading, Text, VStack, Input } from "native-base";
import { useState, useContext, useRef, useEffect } from "react";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { View as MotiView } from "moti";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { CREATE_CATEGORY } from "../../../../../redux/tasks/components/task.actions";
import { Dimensions } from "react-native";
import FabCTA from "../FabCTA";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
const { width: w, height: h } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
const categoryColors = [
    "#D002F5",
    "#E91E63",
    "#00CB53",
    "#602EA5",
    "#E7B400",
    "#D60606",
    "#E67E22",
    "#7FFF00",
    "#9932CC",
];

const categoryNameExamples = [
    "Travel",
    "Health",
    "Sports",
    "Gym",
    "Groceries",
    "Important",
    "Work",
    "Bucket List",
    "School",
    "Hobbies",
    "Personal",
];
function CreateNewCategory() {
    const translate = useSharedValue(0);
    const start = useSharedValue(0);
    const [ActiveColorIndex, setActiveColorIndex] = useState(0);
    const [title, setTitle] = useState("");
    const loadedRef = useRef(false);
    const dispatch = useDispatch();
    const placeholder = useRef(
        categoryNameExamples[Math.floor(Math.random() * categoryNameExamples.length)]
    ).current;
    const gesture = useAnimatedGestureHandler({
        onActive: (e) => {
            translate.value = Math.min(
                0,
                Math.max(e.translationX + start.value, w - 20 - categoryColors.length * 65)
            );
        },
        onFinish: (e) => {
            start.value = translate.value;
        },
    });
    const translateStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translate.value }],
    }));
    useEffect(() => {
        setTimeout(() => {
            loadedRef.current = true;
        }, 500);

        return () => {
            setActiveColorIndex(0);
            setTitle("");
            loadedRef.current = null;
        };
    }, []);
    return (
        <VStack w="full" space={35}>
            <VStack w="full">
                <AnimatedText text="Create a new Category" />
            </VStack>
            <VStack space="30">
                <Text fontSize="sm" opacity={0.7}>
                    Category name
                </Text>
                <Input
                    size="xl"
                    variant="underlined"
                    color="white"
                    isFullWidth
                    selectionColor="white"
                    borderBottomColor="white"
                    underlineColorAndroid={"transparent"}
                    maxLength={20}
                    placeholder={"e.g. " + placeholder}
                    placeholderTextColor={"#ffffffdd"}
                    px="5"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
            </VStack>
            <VStack space="30">
                <Text fontSize="sm" opacity={0.7}>
                    Category theme Color
                </Text>
                <Box w={categoryColors.length * 65} px={2.5}>
                    <PanGestureHandler onGestureEvent={gesture}>
                        <AnimatedBox flexDirection={"row"} style={translateStyle}>
                            {categoryColors.map((item, index) => (
                                <AnimatedPressable
                                    key={item}
                                    onPress={() => setActiveColorIndex(index)}
                                >
                                    <MotiView
                                        from={{
                                            transform: [
                                                {
                                                    scale: 0.5,
                                                },
                                                { translateY: 30 },
                                            ],
                                            opacity: 0,
                                        }}
                                        delay={!loadedRef.current && 1000 + index * 100}
                                        animate={{
                                            transform: [
                                                {
                                                    scale: ActiveColorIndex === index ? 1.3 : 1,
                                                },
                                                {
                                                    translateY: ActiveColorIndex === index ? -5 : 0,
                                                },
                                            ],
                                            opacity: 1,
                                        }}
                                    >
                                        <Center
                                            size="10"
                                            bg={item}
                                            borderColor="white"
                                            borderWidth="4"
                                            rounded="full"
                                            shadow="5"
                                            mr="25"
                                        />
                                    </MotiView>
                                </AnimatedPressable>
                            ))}
                        </AnimatedBox>
                    </PanGestureHandler>
                </Box>
            </VStack>
            <FabCTA
                title="Create New Category"
                onClick={
                    title &&
                    (() =>
                        dispatch({
                            type: CREATE_CATEGORY,
                            payload: {
                                title: title.trim(),
                                color: categoryColors[ActiveColorIndex],
                            },
                        }))
                }
            />
        </VStack>
    );
}

export default CreateNewCategory;
