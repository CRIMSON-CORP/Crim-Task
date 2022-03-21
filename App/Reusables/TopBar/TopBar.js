import { HStack } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import BackArrow from "./TopBarIcons/BackArrow";
const TopBar = ({ back }) => {
    const dispath = useDispatch();
    const { navigation_ref } = useSelector((state) => state.ui);
    return (
        <HStack justifyContent={"space-between"}>
            <AnimatedPressable
                onPress={() => {
                    if (navigation_ref.canGoBack()) {
                        navigation_ref.goBack();
                    } else {
                        dispath({ type: OPEN_SIDE });
                    }
                }}
            >
                {back ? <BackArrow /> : <Menu />}
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
