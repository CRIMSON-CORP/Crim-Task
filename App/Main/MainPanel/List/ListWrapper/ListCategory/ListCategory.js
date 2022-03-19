import { HStack, Text } from "native-base";
import { VStack } from "native-base";
import CategoryCardItem from "../../../../../Reusables/CategoryCardItem/CategoryCardItem";
import { useSelector } from "react-redux";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const ListCategory = () => {
    const categories = useSelector((state) => state.tasks);
    const AnimatedHStackSharedVlaue = useSharedValue(0);
    const AnimatedHStackStartSharedVlaue = useSharedValue(0);
    const gesture = useAnimatedGestureHandler({
        onActive: (e) => {
            const translation = e.translationX + AnimatedHStackStartSharedVlaue.value;
            console.log(-((categories.length - 1) * (width * 0.6) + 80));
            if (
                translation <= 0 &&
                translation >= -((categories.length - 1) * (width * 0.6) + 80)
            ) {
                AnimatedHStackSharedVlaue.value = translation;
            }
        },
        onFinish: (e) => {
            AnimatedHStackStartSharedVlaue.value = AnimatedHStackSharedVlaue.value;
        },
    });
    const AnimatedHSTackStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: AnimatedHStackSharedVlaue.value }],
    }));
    return (
        <VStack space={35}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Categories
            </Text>
            <PanGestureHandler onGestureEvent={gesture}>
                <AnimatedHStack style={AnimatedHSTackStyle}>
                    {categories.map((item) => (
                        <CategoryCardItem
                            categoryColor={item.categoryColor}
                            categoryTitle={item.categoryTitle}
                            tasks={item.tasks}
                            key={item.categoryId}
                            mr="5"
                            shadow="7"
                        />
                    ))}
                </AnimatedHStack>
            </PanGestureHandler>
        </VStack>
    );
};

export default ListCategory;
