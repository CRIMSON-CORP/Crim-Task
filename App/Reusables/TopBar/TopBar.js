import { HStack } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import BackArrow from "./TopBarIcons/BackArrow";
import { SharedElement } from "react-navigation-shared-element";
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
                {back ? (
                    <SharedElement id="item.back">
                        <BackArrow />
                    </SharedElement>
                ) : (
                    <SharedElement id="item.menu">
                        <Menu />
                    </SharedElement>
                )}
            </AnimatedPressable>
            <HStack space="5">
                <SharedElement id="item.search">
                    <AnimatedPressable>
                        <Search />
                    </AnimatedPressable>
                </SharedElement>
                <SharedElement id="item.bell">
                    <AnimatedPressable>
                        <Bell />
                    </AnimatedPressable>
                </SharedElement>
            </HStack>
        </HStack>
    );
};

export default TopBar;
