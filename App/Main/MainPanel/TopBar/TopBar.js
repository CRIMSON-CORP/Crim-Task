import { HStack } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import { useDispatch } from "react-redux";
import { OPEN_SIDE } from "../../../../redux/ui/components/ui.actions";
const TopBar = () => {
    const dispath = useDispatch();
    return (
        <HStack justifyContent={"space-between"}>
            <AnimatedPressable onPress={() => dispath({ type: OPEN_SIDE })}>
                <Menu />
            </AnimatedPressable>
            <HStack space="5">
                <AnimatedPressable>
                    <Search />
                </AnimatedPressable>
                <AnimatedPressable>
                    <Bell />
                </AnimatedPressable>
            </HStack>
        </HStack>
    );
};

export default TopBar;
