import { VStack } from "native-base";
import Greeting from "./Greeting";
import ListCategory from "./ListCategory";

const ListWrapper = () => {
    return (
        <VStack space="10">
            <Greeting />
            <ListCategory />
        </VStack>
    );
};

export default ListWrapper;
