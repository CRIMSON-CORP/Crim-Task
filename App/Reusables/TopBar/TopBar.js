import { HStack } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch } from "react-redux";
import { OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import BackArrow from "./TopBarIcons/BackArrow";
import { SharedElement } from "react-navigation-shared-element";
import { useContext } from "react";
import { NavigationContext } from "../../../utils/context";
const TopBar = ({ back }) => {
    const dispath = useDispatch();
    const { NavigationRef } = useContext(NavigationContext);
    return (
        <HStack justifyContent={"space-between"}>
            <AnimatedPressable
                onPress={() => {
                    if (NavigationRef.canGoBack()) {
                        NavigationRef.goBack();
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
