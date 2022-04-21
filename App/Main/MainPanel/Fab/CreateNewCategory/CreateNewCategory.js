import { View as MotiView } from "moti";
import { Box, Center, Input, Text, useTheme, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { CREATE_CATEGORY, EDIT_CATEGORY } from "../../../../../redux/tasks/components/task.actions";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import FabCTA from "../FabCTA";
const { width: w } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
const categoryColors = [
    "#D002F5",
    "#FFFFFF",
    "#E91E63",
    "#00CB53",
    "#602EA5",
    "#FF7F50",
    "#E7B400",
    "#D60606",
    "#9932CC",
    "#3D5AFE",
    "#FFD700",
    "#40C4FF",
    "#1DE9B6",
    "#00C853",
    "#76FF03",
    "#EEFF41",
    "#FF6F00",
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
function CreateNewCategory({ flag }) {
    const translate = useSharedValue(0);
    const start = useSharedValue(0);
    const [ActiveColorIndex, setActiveColorIndex] = useState(
        flag ? categoryColors.findIndex((color) => flag.color === color) : 0
    );
    const [title, setTitle] = useState(flag ? flag.title : "");
    const loadedRef = useRef(false);
    const dispatch = useDispatch();
    const { colors } = useTheme();
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
                <AnimatedText text={`${flag ? "Edit Category" : "Create a new Category"}`} />
            </VStack>
            <VStack space="30">
                <Text fontSize="sm" opacity={0.7}>
                    {flag ? "Change Category name" : "Category name"}
                </Text>
                <Input
                    size="xl"
                    variant="underlined"
                    color="white"
                    isFullWidth
                    selectionColor={colors.primary.accent}
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
                    {flag ? "Change Theme Color" : "Select theme Color"}
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
                title={`${flag ? "Edit Category" : "Create New Category"}`}
                onClick={
                    title &&
                    (() =>
                        dispatch({
                            type: flag ? EDIT_CATEGORY : CREATE_CATEGORY,
                            payload: {
                                title: title.trim(),
                                color: categoryColors[ActiveColorIndex],
                                ...(flag && { categoryId: flag.categoryId }),
                            },
                        }))
                }
            />
        </VStack>
    );
}

export default CreateNewCategory;
