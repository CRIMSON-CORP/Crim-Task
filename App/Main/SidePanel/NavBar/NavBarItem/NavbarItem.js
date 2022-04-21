import { View } from "moti";
import { HStack, Text } from "native-base";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_SIDE } from "../../../../../redux/ui/components/ui.actions";
import { NavigationContext } from "../../../../../utils/context";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
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
                    NavigationRef.navigate(slug);
                    dispath({ type: CLOSE_SIDE });
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
