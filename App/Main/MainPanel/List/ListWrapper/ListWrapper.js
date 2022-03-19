import { VStack } from "native-base";
import Greeting from "./Greeting";
import ListCategory from "./ListCategory";

const ListWrapper = () => {
    return (
        <VStack space="10">
            <Greeting />
            <ListCategory />
            {/* <ListTasks/> */}
        </VStack>
    );
};

export default ListWrapper;
