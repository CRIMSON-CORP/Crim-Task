import { HStack, Text } from "native-base";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../../../../../redux/ui/components/ui.actions";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
const NavbarItem = ({ icon, text, slug }) => {
    const dispath = useDispatch();
    return (
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
    );
};

export default NavbarItem;
