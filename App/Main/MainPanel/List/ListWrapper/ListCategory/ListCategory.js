import { Image, Text, VStack } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";
import IdleCategory from "../../../../../../assets/crim-task/idle/idle_category.png";
import CategoryCardItem from "../../../../../Reusables/CategoryCardItem/CategoryCardItem";

const { width } = Dimensions.get("window");

function ListCategory() {
    const categories = useSelector((state) => state.tasks);
    return (
        <VStack space={35}>
            <Text fontWeight="bold" opacity={0.7}>
                Categories
            </Text>
            {categories.length ? (
                <Carousel
                    height={120}
                    loop={false}
                    defaultIndex={0}
                    style={styles.carousel}
                    width={width * 0.6 + 20}
                    scrollAnimationDuration={500}
                    data={[...categories.map((item) => JSON.stringify(item))]}
                    renderItem={({ item }) => <CategoryCardItem {...JSON.parse(item)} shadow="7" />}
                />
            ) : (
                <VStack justifyContent="flex-start" h={120} p={5} space="2">
                    <Image
                        h="full"
                        alt="idle category"
                        resizeMode="contain"
                        source={IdleCategory}
                    />
                    <Text textAlign={"center"} fontSize={10}>
                        You have no Categories, press the "+" button to add a new Category
                    </Text>
                </VStack>
            )}
        </VStack>
    );
}

export default ListCategory;

const styles = StyleSheet.create({
    carousel: {
        width,
        overflow: "visible",
    },
});
