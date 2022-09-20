import PropTypes from "prop-types";
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
import { categoryColors, categoryNameExamples } from "../../../../../utils/constants";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import FabCTA from "../FabCTA";
import { useCallback } from "react";
import { createCategory, editCategory } from "../../../../../redux/tasks/components/task.reducer";
import KeyboardViewAdjuster from "../../../../Reusables/KeyboardViewAdjuster/KeyboardViewAdjuster";

const { width } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
const placeholder = categoryNameExamples[Math.floor(Math.random() * categoryNameExamples.length)];

function CreateNewCategory({ flag }) {
    const EDIT_MODE = flag ? (flag.flag ? true : false) : false;

    const translate = useSharedValue(0);
    const start = useSharedValue(0);
    const [ActiveColorIndex, setActiveColorIndex] = useState(
        EDIT_MODE ? categoryColors.findIndex((color) => flag.color === color) : 0
    );
    const [title, setTitle] = useState(EDIT_MODE ? flag.title : "");
    const loadedRef = useRef(false);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const gesture = useAnimatedGestureHandler({
        onActive: (e) => {
            translate.value = Math.min(
                0,
                Math.max(e.translationX + start.value, width - 20 - categoryColors.length * 65)
            );
        },
        onFinish: () => {
            start.value = translate.value;
        },
    });

    const translateStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translate.value }],
    }));

    useEffect(() => {
        loadedRef.current = true;
        return () => {
            setActiveColorIndex(0);
            setTitle("");
            loadedRef.current = null;
        };
    }, []);

    const createOrEditCategory = useCallback(() => {
        let commonProperties = {
            title: title.trim(),
            color: categoryColors[ActiveColorIndex],
        };
        if (EDIT_MODE) {
            dispatch(
                editCategory({
                    ...commonProperties,
                    categoryId: flag.categoryId,
                })
            );
        } else {
            dispatch(createCategory(commonProperties));
        }
    }, [title, ActiveColorIndex]);

    const updateTitle = useCallback((text) => setTitle(text), []);

    const colorCircleAnimationProps = useCallback(
        (index) => ({
            from: {
                scale: 0.5,
                opacity: 0,
                translateY: 30,
            },
            delay: !loadedRef.current && 1600 + index * 100,
            animate: {
                opacity: 1,
                scale: ActiveColorIndex === index ? 1.3 : 1,
                translateY: ActiveColorIndex === index ? -5 : 0,
            },
        }),
        [ActiveColorIndex, loadedRef.current]
    );

    const PAGE_TITLE = EDIT_MODE ? "Edit Category" : "Create a new Category";
    const PAGE_SUBTITLE = EDIT_MODE ? "Change Category name" : "Category name";
    const PLACEHOLDER = "e.g. " + placeholder;
    const PAGE_THEME_COLOR_SUBTITLE_TEXT = EDIT_MODE ? "Change Theme Color" : "Select theme Color";
    const FAB_CTA_TEXT = EDIT_MODE ? "Edit Category" : "Create New Category";

    return (
        <KeyboardViewAdjuster>
            <VStack w="full" space={35}>
                <VStack w="full">
                    <AnimatedText delay={1000}>{PAGE_TITLE}</AnimatedText>
                </VStack>
                <VStack space="30">
                    <Text fontSize="sm" opacity={0.7}>
                        {PAGE_SUBTITLE}
                    </Text>
                    <Input
                        px="5"
                        size="xl"
                        isFullWidth
                        color="white"
                        value={title}
                        maxLength={20}
                        variant="underlined"
                        placeholder={PLACEHOLDER}
                        borderBottomColor="white"
                        onChangeText={updateTitle}
                        placeholderTextColor={"#ffffffdd"}
                        underlineColorAndroid={"transparent"}
                        selectionColor={colors.primary.accent}
                    />
                </VStack>
                <VStack space="30">
                    <Text fontSize="sm" opacity={0.7}>
                        {PAGE_THEME_COLOR_SUBTITLE_TEXT}
                    </Text>
                    <Box w={categoryColors.length * 65} px={2.5}>
                        <PanGestureHandler onGestureEvent={gesture}>
                            <AnimatedBox flexDirection={"row"} style={translateStyle}>
                                {categoryColors.map((item, index) => (
                                    <AnimatedPressable
                                        key={item}
                                        onPress={() => setActiveColorIndex(index)}
                                    >
                                        <MotiView {...colorCircleAnimationProps(index)}>
                                            <Center
                                                mr="25"
                                                size="10"
                                                bg={item}
                                                shadow="5"
                                                rounded="full"
                                                borderWidth="4"
                                                borderColor="white"
                                            />
                                        </MotiView>
                                    </AnimatedPressable>
                                ))}
                            </AnimatedBox>
                        </PanGestureHandler>
                    </Box>
                </VStack>
                <FabCTA title={FAB_CTA_TEXT} onClick={title ? createOrEditCategory : null} />
            </VStack>
        </KeyboardViewAdjuster>
    );
}

CreateNewCategory.propTypes = {
    flag: PropTypes.object,
};

export default CreateNewCategory;
