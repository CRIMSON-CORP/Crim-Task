import { VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
const List = () => {
    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <VStack space="10">
                <Topbar />
                <ListWrapper />
            </VStack>
        </SafeAreaView>
    );
};

export default List;
