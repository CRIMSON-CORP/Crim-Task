import { HStack, Text } from "native-base";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../../../../../redux/ui/components/ui.actions";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { View } from "moti";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../../../../utils/context";
const NavbarItem = ({ icon, text, slug }) => {
    const dispath = useDispatch();
    const { NavigationRef } = useContext(NavigationContext);
    const [Active, setActive] = useState(false);
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", (e) => {
            setActive(NavigationRef.getCurrentRoute().name === slug);
        });

        return unsub;
    }, []);
    return (
        <View
            animate={{
                opacity: Active ? 1 : 0.6,
                transform: [{ scale: Active ? 1 : 0.95 }],
            }}
        >
            <AnimatedPressable
                onPress={() => {
                    dispath({ type: ACTIONS.SET_PANEL_VIEW, payload: { view: slug } });
                    NavigationRef.navigate(slug);
                }}
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
