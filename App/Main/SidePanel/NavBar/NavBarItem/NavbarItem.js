import { HStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../../../../../redux/ui/components/ui.actions";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { View } from "moti";
const NavbarItem = ({ icon, text, slug }) => {
    const dispath = useDispatch();
    const ActiveNavItem = useSelector((state) => state.ui.view);
    const Active = ActiveNavItem === slug;
    return (
        <View
            animate={{
                opacity: Active ? 1 : 0.6,
                transform: [{ scale: Active ? 1 : 0.95 }],
            }}
        >
            <AnimatedPressable
                onPress={() => dispath({ type: ACTIONS.SET_PANEL_VIEW, payload: { view: slug } })}
            >
                <HStack space="8" alignItems="center">
                    {icon}
                    <Text fontSize={24} mt={-1}>
                        {text}
                    </Text>
                </HStack>
            </AnimatedPressable>
        </View>
    );
};

export default NavbarItem;
