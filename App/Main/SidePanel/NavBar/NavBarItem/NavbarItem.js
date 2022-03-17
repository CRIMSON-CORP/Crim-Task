import { HStack, Text } from "native-base";
import { MotiPressable } from "moti/interactions";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../../../../../redux/ui/components/ui.actions";
import { useMemo } from "react";
const NavbarItem = ({ icon, text, slug }) => {
    const dispath = useDispatch();
    return (
        <MotiPressable
            onPress={() => dispath({ type: ACTIONS.SET_PANEL_VIEW, payload: { view: slug } })}
            animate={useMemo(() => ({ pressed, hovered }) => {
                "worklet";
                return {
                    transform: [{ scale: hovered || pressed ? 0.8 : 1 }],
                    opacity: hovered || pressed ? 0.8 : 1,
                };
            })}
        >
            <HStack space="8" alignItems="center">
                {icon}
                <Text fontSize={24} mt={-1}>
                    {text}
                </Text>
            </HStack>
        </MotiPressable>
    );
};

export default NavbarItem;
