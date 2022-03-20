import { Text, VStack } from "native-base";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";
import CategoryCardItem from "../../../../../Reusables/CategoryCardItem/CategoryCardItem";
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
                height={120}
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
