import { VStack } from "native-base";
import Greeting from "./Greeting";
import ListCategory from "./ListCategory";
import RecentTasks from "./RecentTasks";

function ListWrapper() {
    return (
        <VStack space="10">
            <Greeting />
            <ListCategory />
            <RecentTasks />
        </VStack>
    );
}

export default ListWrapper;
