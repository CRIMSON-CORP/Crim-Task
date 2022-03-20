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
import Carousel from "react-native-reanimated-carousel";
const { width } = Dimensions.get("window");
const ListCategory = () => {
    const categories = useSelector((state) => state.tasks);
    return (
        <VStack space={35}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Categories
            </Text>
            <Carousel
                width={width * 0.6 + 20}
                loop={false}
                showLength={0.5}
                style={{
                    overflow: "visible",
                }}
                data={categories}
                renderItem={({ item }) => (
                    <CategoryCardItem
                        categoryColor={item.categoryColor}
                        categoryTitle={item.categoryTitle}
                        tasks={item.tasks}
                        key={item.categoryId}
                        mr="5"
                        shadow="7"
                    />
                )}
            />
        </VStack>
    );
};

export default ListCategory;
