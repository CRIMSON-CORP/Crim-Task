import { MotiView } from "moti";
import { Image, Text, VStack } from "native-base";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";
import IdleCategory from "../../../../../../assets/crim-task/idle/idle_category.png";
import CategoryCardItem from "../../../../../Reusables/CategoryCardItem/CategoryCardItem";
const { width } = Dimensions.get("window");
const ListCategory = () => {
    const categories = useSelector((state) => state.tasks);
    return (
        <VStack space={35}>
            <Text fontWeight="bold" opacity={0.7}>
                Categories
            </Text>
            {categories.length ? (
                <Carousel
                    height={120}
                    width={width * 0.6 + 20}
                    loop={false}
                    scrollAnimationDuration={500}
                    style={{
                        overflow: "visible",
                        width,
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
                                damping: 5,
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ scale: 1 }],
                            }}
                            style={{ width: width * 0.6 }}
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
            ) : (
                <VStack justifyContent="flex-start" h={120} p={5} space="2">
                    <Image
                        source={IdleCategory}
                        resizeMode="contain"
                        h="full"
                        alt="idle category"
                    />
                    <Text textAlign={"center"} fontSize={10}>
                        You have no Categories, press the "+" button to add a new Category
                    </Text>
                </VStack>
            )}
        </VStack>
    );
};

export default ListCategory;
