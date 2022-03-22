import { MotiView } from "moti";
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
            <Text fontWeight="bold" opacity={0.7}>
                Categories
            </Text>
            <Carousel
                width={width * 0.6 + 20}
                height={120}
                loop={false}
                scrollAnimationDuration={500}
                style={{
                    overflow: "visible",
                }}
                data={categories}
                renderItem={({ item, index }) => (
                    <MotiView
                        from={{
                            opacity: 0.5,
                            transform: [{ scale: 0.8 }],
                        }}
                        transition={{
                            type: "spring",
                            delay: index * 300,
                            damping: 8,
                        }}
                        animate={{
                            opacity: 1,
                            transform: [{ scale: 1 }],
                        }}
                    >
                        <CategoryCardItem
                            categoryColor={item.categoryColor}
                            categoryTitle={item.categoryTitle}
                            categoryId={item.categoryId}
                            tasks={item.tasks}
                            key={item.categoryId}
                            mr="5"
                            shadow="7"
                        />
                    </MotiView>
                )}
            />
        </VStack>
    );
};

export default ListCategory;
